export default (req, res) => {
  const { mess, data } = req.query;

  if (!mess || !data) {
    return res.status(400).json({ error: "Both 'mess' and 'data' parameters are required" });
  }

  const id = data.slice(12, 22);

  // تحويل النص إلى تمثيل هيكلي (hexadecimal)
  let msg = Buffer.from(mess, 'utf-8').toString('hex');
  
  // التأكد من أن msg لا يتجاوز الطول المحدد (420 حرفًا)
  const target_length = 420;
  const fill_char = "20";
  if (msg.length > target_length) {
    msg = msg.slice(0, target_length);
  } else if (msg.length < target_length) {
    const fill_length = target_length - msg.length;
    msg = msg + fill_char.repeat(Math.ceil(fill_length / fill_char.length)).slice(0, fill_length);
  }

  // بناء الرسالة النهائية
  const packet = `120000018d08${id}101220022a800308${id}10${id}22d201${msg}28bcec8bb7064a3d0a18efbca2efbcb2efbcb3e385a4efbcadefbcafefbcb2efbcaf10dedd8dae031893b6d3ad0320d7012883f9f7b103420c47524f564553545249544348520261726a520a4c68747470733a2f2f67726170682e66616365626f6f6b2e636f6d2f76392e302f3132303434333431303231333534352f706963747572653f77696474683d313630266865696768743d313630100118017200`;

  res.status(200).json({ packet });
};
