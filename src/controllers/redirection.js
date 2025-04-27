import URLModel from "../models/url.model.js";

export const redirectHandler = async (req, res) => {
  try {
    const hash = req.params.id;

    const urlExist = await URLModel.findOne({ hash: hash });

    console.log(urlExist);

    if (!urlExist)
      return res.status(404).json({
        success: false,
        message: "URL not found",
      });

    await urlExist.updateOne({ $inc: { clicks: +1 } });

    return res.redirect(`https://${urlExist.final_destination}`);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};
