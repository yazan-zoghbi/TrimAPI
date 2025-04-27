import fetch from "node-fetch";
import { createHash } from "node:crypto";
import dotenv from "dotenv";

import URLModel from "../models/url.model.js";

dotenv.config({ path: "./.env.local" });

const validateURL = async (url) => {
  try {
    return await fetch(url);
  } catch (error) {
    console.error(error.message);
  }
};

const normalizeURL = async (url) => {
  try {
    const fetch = await validateURL(url);

    if (fetch.status !== 200) {
      throw new Error(`Check the url before submitting`);
    }

    return new URL(fetch.url)
      .toString()
      .toLowerCase()
      .replace(/^https?:\/\/(www\.)?/, "")
      .replace(/\/$/, "");
  } catch (error) {
    console.error(error.message);
  }
};

export const generateURL = async (req, res) => {
  try {
    const { url } = req.body;

    const host = process.env.HOST;
    const port = process.env.PORT;

    const normalized = await normalizeURL(url);

    const hash = createHash("sha256")
      .update(normalized)
      .digest("base64url")
      .slice(0, 8);

    await URLModel.create({
      submitted_url: url,
      final_destination: normalized,
      hash: hash,
    });

    return res.status(200).json({
      success: true,
      data: {
        "Original URL": normalized,
        "Shorten URL": `${host}:${port}/${hash}`,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getURL = async (req, res) => {
  try {
    const { hash } = req.params;

    const shortURL = await URLModel.find({ hash: hash });

    res.status(200).json({
      success: true,
      data: shortURL,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
