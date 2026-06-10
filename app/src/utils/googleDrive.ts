const DRIVE_FILE_ID_PATTERN =
  /(?:\/file\/d\/|\/open\?id=|id=)([a-zA-Z0-9_-]+)/;

export function getGoogleDriveFileId(url: string): string | null {
  const match = url.match(DRIVE_FILE_ID_PATTERN);
  return match?.[1] ?? null;
}

export function getGoogleDrivePreviewUrl(url: string): string | null {
  const fileId = getGoogleDriveFileId(url);
  return fileId ? `https://drive.google.com/file/d/${fileId}/preview` : null;
}

export function hasGoogleDriveEmbed(
  body: { _type?: string }[] | null | undefined
): boolean {
  return body?.some((block) => block._type === "googleDriveEmbed") ?? false;
}
