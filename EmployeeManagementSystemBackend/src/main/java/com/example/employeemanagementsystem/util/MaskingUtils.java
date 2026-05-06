package com.example.employeemanagementsystem.util;

import org.springframework.stereotype.Component;

@Component
public class MaskingUtils {

    /**
     * Masks Aadhar card number showing only last 4 digits
     * Format: XXXX-XXXX-XXXX
     * Example: 1234-5678-1234 -> XXXX-XXXX-1234
     */
    public String maskAadhar(String aadhar) {
        if (aadhar == null || aadhar.isBlank()) {
            return "";
        }
        String cleaned = aadhar.replaceAll("[^0-9]", "");
        if (cleaned.length() < 4) {
            return aadhar;
        }
        String last4 = cleaned.substring(cleaned.length() - 4);
        return "XXXX-XXXX-" + last4;
    }

    /**
     * Masks PAN card number partially
     * Format: ABCDE****
     * Example: ABCDE1234F -> ABCDE****
     */
    public String maskPAN(String pan) {
        if (pan == null || pan.isBlank()) {
            return "";
        }
        if (pan.length() <= 5) {
            return pan;
        }
        return pan.substring(0, 5) + "****";
    }

    /**
     * Masks any sensitive data showing first 3 and last 2 characters
     * Used for general masking needs
     */
    public String partialMask(String value) {
        if (value == null || value.isBlank()) {
            return "";
        }
        if (value.length() <= 5) {
            return value;
        }
        return value.substring(0, 3) + "****";
    }
}
