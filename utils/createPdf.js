const PDFDocument = require('pdfkit');
const getStream = require('get-stream');

const createPdf = async (markets) => {
  const doc = new PDFDocument();
  doc.fontSize(22).text('Markets Report.');

  for (let market of markets) {
    doc.fontSize(14).text('------------');
    doc.fontSize(14).text(JSON.stringify(market));
  }
  doc.end();
  const pdfBuffer = await getStream.buffer(doc);
  const pdfBase64string = pdfBuffer.toString('base64');
  return pdfBase64string;
};

module.exports = createPdf;
