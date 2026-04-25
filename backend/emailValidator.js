async function validateEmailAddress(email) {
    if (!email || typeof email !== 'string' || !email.includes('@')) {
        return false;
    }

    const apiKey = process.env.MAILEROO_API_KEY;

    try {
        const url = `https://api.zeruh.com/v1/verify?api_key=${'7bfcea5e9c45c30b430eb2097c337340920d5b213ed5982a65b24374b4d0cbcb'}&email_address=${encodeURIComponent(email)}`;
        const response = await fetch(url, {
            method: 'GET'
        });

        if (!response.ok) {
            console.error("HTTP error:", response.status);
            return false;
        }

        
        const data = await response.json();
        console.log("Maileroo response:", data);

        if (!data.success || !data.result) {
            return false;
        }
        const result = data.result;
        const v = result.validation_details;

        const isValid =
            v.format_valid &&
            v.mx_found &&
            v.smtp_check &&
            !v.disposable &&
            !v.mailbox_disabled;

        // gérer le cas "risky"
        if (result.status === 'risky') {
            console.warn("Email risky:", email);
            return isValid;
        }

        return isValid;

    } catch (error) {
        console.error("Maileroo error:", error);
        return false;
    }
}

module.exports = {
    validateEmailAddress
};
