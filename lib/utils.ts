import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createDelegateWhatsappGroup = (whatsappGroupUrl: string) => {
  return `
    <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background-color: #ffffff; color: #333333; padding: 20px;">
      
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; border: 1px solid #dee2e6; border-radius: 8px;">
        <tr>
          <td style="padding: 30px; text-align: center;">
            
            <h1 style="color: #6f42c1; margin: 0 0 10px 0; font-size: 28px; font-weight: bold;">CODEFUSE 2.0</h1>
            <h2 style="color: #333333; margin: 0 0 20px 0; font-size: 18px; font-weight: normal;">Delegates WhatsApp Group</h2>
            
            <p style="color: #666666; margin: 0 0 30px 0; font-size: 16px; line-height: 1.5;">
              Join our exclusive delegate community for updates and networking.
            </p>
            
            <table cellpadding="0" cellspacing="0" style="margin: 0 auto;">
              <tr>
                <td style="background-color: #6f42c1; border-radius: 6px; padding: 15px 25px;">
                  <a href="${whatsappGroupUrl}" style="color: #ffffff; text-decoration: none; font-weight: bold; font-size: 16px; display: block;">
                    Join WhatsApp Group
                  </a>
                </td>
              </tr>
            </table>
            
            <p style="color: #999999; margin: 15px 0 0 0; font-size: 12px;">
              You received this because you are a registered for CODEFUSE 2.0
            </p>
            
          </td>
        </tr>
      </table>
      
    </div>
  `;
};