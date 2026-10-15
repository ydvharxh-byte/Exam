/**
 * Central Configuration for KVS Principal Exam Telegram Integration.
 * 
 * NOTE: The Telegram channel URL is a private invite link.
 * You can override this URL by adding VITE_TELEGRAM_INVITE_URL in your `.env.local` file.
 * Private API credentials or bot tokens must NEVER be committed to client code.
 */

export interface TelegramConfig {
  /** The private invite link or channel URL to join */
  inviteUrl: string;
  /** Display title for the channel */
  channelName: string;
  /** Short channel handle / label */
  channelHandle: string;
  /** Descriptive overview of the channel resources */
  description: string;
  /** Editorial status badge text */
  badgeText: string;
  /** Instructions for first-time aspirants */
  guidanceText: string;
}

export const TELEGRAM_CONFIG: TelegramConfig = {
  // Reads from VITE_TELEGRAM_INVITE_URL environment variable if set, otherwise uses the configured fallback invite link
  inviteUrl:
    (import.meta as unknown as { env?: Record<string, string> }).env?.VITE_TELEGRAM_INVITE_URL ||
    "https://t.me/+24Yj55eKums2YTQ1",
  channelName: "KVS Principal Aspirants Study Hub",
  channelHandle: "KVS Principal Cadre Repository",
  description:
    "Direct gateway to our private Telegram study repository containing full uncompressed PDFs, administrative circulars, GFR 2017 compendiums, Swamy's handbooks, and peer discussions for the KVS Principal Exam.",
  badgeText: "Private Academic Channel • Zero Bulk File Uploads",
  guidanceText:
    "Click below to open the private invite link directly in Telegram on your phone or desktop. All official documents, gazettes, and model question papers are indexed chronologically in the channel archive."
};
