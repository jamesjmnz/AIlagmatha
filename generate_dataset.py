import csv
import random

OUTPUT_FILE = "scam_dataset.csv"
N_SCAM = 1000
N_LEGIT = 1000

scam_templates = [
    "GCash Alert: We detected a problem sa account mo. Send your OTP now to avoid permanent lock.",
    "{bank} Security: Your account is frozen. Reply with the OTP you received to unlock immediately.",
    "Parcel held by customs. Pay ₱{fee} via GCash using this link: {link} to release your package.",
    "Congrats! Your number won ₱{amount}. Send the 6-digit code you received to claim your prize.",
    "You qualify for DSWD ayuda worth ₱{amount}. Confirm by replying with your GCash OTP.",
    "Your SIM will be deactivated in 24 hours. Send the OTP now to keep your number active.",
    "Work abroad in Canada! Pay processing fee ₱{fee} via GCash to reserve your slot.",
    "Your PayPal account is restricted. Click {link} and enter your OTP to restore access.",
    "BDO: To confirm ownership, reply with PIN and OTP now.",
    "Customs: Your package is on hold. Pay clearance fee ₱{fee} through this link: {link}.",
    "You have unclaimed remittance of ₱{amount}. Send your OTP to receive the money.",
    "GCash Reversal: To cancel unauthorized transaction, reply with the OTP you just received.",
    "Bank notice: We will deduct ₱{fee} if you fail to send your OTP for verification.",
    "Facebook: Your account will be disabled. Verify now at {link} and provide your login code.",
    "Investment chance! Double your money today. Join VIP group by paying ₱{fee} via GCash.",
    "Special gov assistance: ₱{amount} ready for you. Confirm via OTP reply.",
    "Security Alert: Suspicious login detected. Reply with the 6-digit code to secure your account.",
    "You can withdraw ₱{amount} now. Send verification code to proceed.",
    "Exclusive earnings opportunity! Pay ₱{fee} to access secret trading group.",
    "Your {service} reward is waiting. Enter the code you received to claim it now.",
]

legit_templates = [
    "{bank}: Your payment of ₱{amount} has been posted. Thank you.",
    "{bank}: Your OTP is {otp}. Do NOT share this with anyone.",
    "{service}: Your bill of ₱{amount} is due on Feb {day}. Please pay on time to avoid disconnection.",
    "{service}: Payment received. Amount: ₱{amount}.",
    "{service}: Temporary service interruption in your area. Our team is working to restore it.",
    "LBC: Your parcel is out for delivery today.",
    "J&T Express: Rider is on the way. Please keep your phone active.",
    "Meralco eBill: Statement ready. Amount due: ₱{amount}.",
    "PhilHealth: Policy updates effective next month. Visit official site for details.",
    "Pag-IBIG: We received your housing loan application.",
    "GCash: Money sent ₱{amount} to {name}. Ref: {ref}.",
    "Shopee: Your order has been shipped. Tracking number: {ref}.",
    "Lazada: Your package has arrived at our facility and will be delivered soon.",
    "Globe: Load of ₱{amount} successfully credited.",
    "Smart: Your promo is now active and valid until Feb {day}.",
    "School Advisory: No classes tomorrow due to weather conditions.",
    "Company HR: Your interview is confirmed on Feb {day} at 2:00 PM.",
    "Clinic: Your appointment is scheduled on Feb {day}, 10:00 AM.",
    "Bank Reminder: Please update your contact information at the nearest branch.",
    "GCash: Do not share your OTP or MPIN with anyone. Official channels will never ask for it.",
]

banks = ["BDO", "BPI", "Metrobank", "Landbank", "Security Bank"]
services = ["GCash", "Meralco", "Globe", "Smart", "PLDT", "Converge"]
names = ["Juan Dela Cruz", "Maria Santos", "Pedro Reyes", "Ana Lopez"]
links = [
    "http://verify-ph.com",
    "http://secure-ph.com",
    "http://claim-reward-ph.com",
    "http://parcel-release-ph.com",
]
refs = ["A48293", "TRX9320", "ORD5521", "INV8473", "PKG2201"]


def make_scam():
    tmpl = random.choice(scam_templates)
    return tmpl.format(
        bank=random.choice(banks),
        service=random.choice(services),
        amount=random.randint(2000, 50000),
        fee=random.randint(99, 1500),
        link=random.choice(links),
    )


def make_legit():
    tmpl = random.choice(legit_templates)
    return tmpl.format(
        bank=random.choice(banks),
        service=random.choice(services),
        amount=random.randint(50, 5000),
        day=random.randint(5, 28),
        otp=random.randint(100000, 999999),
        name=random.choice(names),
        ref=random.choice(refs),
    )


def main():
    rows = []

    for _ in range(N_SCAM):
        rows.append({"text": make_scam(), "label": 1})

    for _ in range(N_LEGIT):
        rows.append({"text": make_legit(), "label": 0})

    random.shuffle(rows)

    with open(OUTPUT_FILE, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["text", "label"])
        writer.writeheader()
        writer.writerows(rows)

    print(f"✅ Generated {len(rows)} rows in {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
