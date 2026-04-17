import { toDataURL } from "qrcode";

export async function createQrCodeDataUrl(url: string): Promise<string> {
  return toDataURL(url, {
    errorCorrectionLevel: "H",
    margin: 1,
    width: 220,
    color: {
      dark: "#142033",
      light: "#f6f0e4",
    },
  });
}
