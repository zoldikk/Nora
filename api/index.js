const max = (text, target_length = 416, fill_char = "20") => {
  if (text.length > target_length) {
    return text.slice(0, target_length);
  } else if (text.length < target_length) {
    const fill_length = target_length - text.length;
    return text + fill_char.repeat(Math.ceil(fill_length / fill_char.length)).slice(0, fill_length);
  } else {
    return text;
  }
};

const message = (id, text) => {
  let msg = Buffer.from(text, 'utf-8').toString('hex');
  msg = max(msg);
  const packet = `120000017508${id}101220022ae80208${id}10${id}22d001${msg}28d2c3f9b4064a130a0c504547415355532d5445535420c9013802520261726a660a6068747470733a2f2f6c68332e676f6f676c6575736572636f6e74656e742e636f6d2f612f414367386f634b326247456d54674969654e623437684c4776365568744c396d6a74347a64566e767a305f67654d42397247442d74673d7339362d63100118017200`;
  return packet;
};

export default (req, res) => {
  const { mess, data } = req.query;

  if (!mess || !data) {
    return res.status(400).json({ error: "Both 'mess' and 'data' parameters are required" });
  }

  const uid = data.slice(12, 22);
  const result = message(uid, mess);

  res.status(200).json(result);
};
