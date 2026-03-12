/**
 * Cross-platform check if a path is inside .sisyphus-light/ directory.
 * Handles both forward slashes (Unix) and backslashes (Windows).
 * Uses path segment matching (not substring) to avoid false positives like "not-sisyphus-light/file.txt"
 */
export function isSisyphusPath(filePath: string): boolean {
  return /\.sisyphus-light[/\\]/.test(filePath)
}
