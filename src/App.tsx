import React, { useState } from "react";

export default function App() {
  const [formData, setFormData] = useState({
    subject: "",
    summary: "",
    recipient: "Teacher",
    customRecipient: "",
    relationship: "Student",
    customRelationship: "",
    mood: "Professional",
  });

  const [generatedEmail, setGeneratedEmail] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateEmail = (e) => {
    e.preventDefault();

    const {
      subject,
      summary,
      recipient,
      customRecipient,
      relationship,
      customRelationship,
      mood,
    } = formData;

    const actualRecipient = recipient === "Other" ? customRecipient : recipient;
    const actualRelationship =
      relationship === "Other" ? customRelationship : relationship;

    // Default fallbacks if fields are empty
    const sub = subject || "(No Subject)";
    const sum = summary || "just wanted to reach out and connect";
    const to = actualRecipient || "there";

    // Openers and Closers based on Mood & Relationship
    let greeting = `Dear ${to},`;
    let signoff = `Best regards,\n[Your Name]`;

    if (mood === "Crazy") {
      greeting = `GUESS WHAT, ${to.toUpperCase()}?! ✨🚀`;
      signoff = `YOLO,\n[Your Name] 🤪`;
    } else if (mood === "Happy") {
      greeting = `Hi ${to}! hope you're having a wonderful day! 😊`;
      signoff = `Warmly,\n[Your Name] ✨`;
    } else if (mood === "Sad") {
      greeting = `Dear ${to},`;
      signoff = `With a heavy heart,\n[Your Name] 😔`;
    } else if (mood === "Calm") {
      greeting = `Hello ${to},`;
      signoff = `Peace and love,\n[Your Name] 🧘‍♂️`;
    } else if (
      actualRelationship === "Mom" ||
      actualRelationship === "Dad" ||
      actualRelationship === "Married" ||
      actualRelationship === "Dating"
    ) {
      greeting = `Hey ${to},`;
      signoff = `Love you,\n[Your Name] ❤️`;
    }

    // Body Text generation matrix based on mood
    let bodyText = "";
    switch (mood) {
      case "Happy":
        bodyText = `I'm writing to you because ${sum}. I'm honestly so excited about this and couldn't wait to share it with you! Let me know what you think when you get a chance!`;
        break;
      case "Sad":
        bodyText = `I am reaching out regarding ${sum}. It's a bit tough to bring up, but I felt it was important to let you know. Hope all is well with you despite everything.`;
        break;
      case "Crazy":
        bodyText = `🚨 BUCKLE UP! 🚨 I am hitting your inbox because ${sum.toUpperCase()}!!! Yes, you read that right! Absolute madness! Let's make it happen ASAP!!!`;
        break;
      case "Calm":
        bodyText = `I wanted to take a quiet moment to reach out to you about ${sum}. No rush at all on this, whenever you have some free time to look it over works for me. Take care.`;
        break;
      case "Professional":
      default:
        bodyText = `I am writing to formally communicate regarding ${sum}. Please review this information at your earliest convenience. I look forward to your response regarding this matter.`;
        break;
    }

    const emailDraft = `Subject: ${sub}\n\n${greeting}\n\n${bodyText}\n\n${signoff}`;
    setGeneratedEmail(emailDraft);
  };

  // Modern Gemini-inspired Theme Styles
  const styles = {
    appContainer: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      width: "100vw",
      backgroundColor: "#f4f7fc",
      color: "#1e293b",
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      margin: 0,
      padding: 0,
      boxSizing: "border-box",
    },
    header: {
      padding: "24px 40px",
      backgroundColor: "#ffffff",
      borderBottom: "1px solid #e2e8f0",
      display: "flex",
      flexDirection: "column",
      gap: "4px",
    },
    title: {
      fontSize: "28px",
      fontWeight: "700",
      color: "#1a73e8",
      margin: 0,
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    subtitle: {
      fontSize: "14px",
      color: "#5f6368",
      margin: 0,
    },
    mainLayout: {
      display: "flex",
      flex: 1,
      width: "100%",
      height: "calc(100vh - 93px)",
    },
    formSection: {
      flex: "1",
      backgroundColor: "#ffffff",
      padding: "40px",
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      gap: "24px",
      borderRight: "1px solid #e2e8f0",
    },
    outputSection: {
      flex: "1",
      backgroundColor: "#f8fafc",
      padding: "40px",
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },
    formRow: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "20px",
    },
    label: {
      fontSize: "14px",
      fontWeight: "600",
      color: "#334155",
    },
    input: {
      padding: "12px 16px",
      borderRadius: "8px",
      border: "1px solid #cbd5e1",
      fontSize: "15px",
      outline: "none",
      transition: "border-color 0.2s, box-shadow 0.2s",
      backgroundColor: "#ffffff",
    },
    select: {
      padding: "12px 16px",
      borderRadius: "8px",
      border: "1px solid #cbd5e1",
      fontSize: "15px",
      outline: "none",
      backgroundColor: "#ffffff",
      cursor: "pointer",
    },
    generateBtn: {
      backgroundColor: "#1a73e8",
      color: "#ffffff",
      padding: "14px 24px",
      borderRadius: "100px",
      border: "none",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      marginTop: "12px",
      alignSelf: "flex-start",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)",
      transition: "background-color 0.2s",
    },
    sectionHeading: {
      fontSize: "20px",
      fontWeight: "600",
      color: "#1e293b",
      marginBottom: "20px",
      marginTop: 0,
    },
    resultBox: {
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      padding: "32px",
      border: "1px solid #e2e8f0",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
      display: "flex",
      flexDirection: "column",
      gap: "24px",
      flex: 1,
    },
    pre: {
      whiteSpace: "pre-wrap",
      wordBreak: "break-word",
      fontFamily: "inherit",
      fontSize: "16px",
      lineHeight: "1.6",
      color: "#334155",
      margin: 0,
      flex: 1,
    },
    copyBtn: {
      backgroundColor: "#f1f5f9",
      color: "#1a73e8",
      padding: "10px 20px",
      borderRadius: "8px",
      border: "1px solid #cbd5e1",
      fontSize: "14px",
      fontWeight: "600",
      cursor: "pointer",
      alignSelf: "flex-end",
      transition: "background-color 0.2s",
    },
    placeholderBox: {
      border: "2px dashed #cbd5e1",
      borderRadius: "16px",
      padding: "40px",
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
      color: "#64748b",
      fontSize: "16px",
      backgroundColor: "#ffffff",
    },
  };

  return (
    <div style={styles.appContainer}>
      <header style={styles.header}>
        <h1 style={styles.title}>✍️ Email Buddy ✍️</h1>
        <p style={styles.subtitle}>
          Fill out the details below to generate your personalized email.
        </p>
      </header>

      <div style={styles.mainLayout}>
        {/* FORM SECTION */}
        <form onSubmit={generateEmail} style={styles.formSection}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Subject Line</label>
            <input
              style={styles.input}
              type="text"
              name="subject"
              placeholder="e.g., Sick Day, Project Update, Saying Hi"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              What is this email about? (One sentence)
            </label>
            <input
              style={styles.input}
              type="text"
              name="summary"
              placeholder="e.g., I missed class because I have a fever."
              value={formData.summary}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Who is this to?</label>
              <select
                style={styles.select}
                name="recipient"
                value={formData.recipient}
                onChange={handleChange}
              >
                <option value="Teacher">Teacher</option>
                <option value="Coach">Coach</option>
                <option value="Mom">Mom</option>
                <option value="Dad">Dad</option>
                <option value="Boss">Boss</option>
                <option value="Other">Other...</option>
              </select>
              {formData.recipient === "Other" && (
                <input
                  style={{ ...styles.input, marginTop: "8px" }}
                  type="text"
                  name="customRecipient"
                  placeholder="Enter recipient name"
                  value={formData.customRecipient}
                  onChange={handleChange}
                  required
                />
              )}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Your relationship to them</label>
              <select
                style={styles.select}
                name="relationship"
                value={formData.relationship}
                onChange={handleChange}
              >
                <option value="Student">Student</option>
                <option value="Athlete">Athlete</option>
                <option value="Child">Child</option>
                <option value="Employee">Employee</option>
                <option value="Married">Married</option>
                <option value="Dating">Dating</option>
                <option value="Friend">Friend</option>
                <option value="Other">Other...</option>
              </select>
              {formData.relationship === "Other" && (
                <input
                  style={{ ...styles.input, marginTop: "8px" }}
                  type="text"
                  name="customRelationship"
                  placeholder="e.g., Acquaintance"
                  value={formData.customRelationship}
                  onChange={handleChange}
                  required
                />
              )}
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>What is the Mood/Vibe?</label>
            <select
              style={styles.select}
              name="mood"
              value={formData.mood}
              onChange={handleChange}
            >
              <option value="Professional">💼 Professional / Calm</option>
              <option value="Happy">😊 Happy / Energetic</option>
              <option value="Sad">😔 Sad / Serious</option>
              <option value="Crazy">🤪 Crazy / Wild</option>
              <option value="Calm">🧘‍♂️ Relaxed / Chill</option>
            </select>
          </div>

          <button
            type="submit"
            style={styles.generateBtn}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#1557b0")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#1a73e8")}
          >
            Generate Email ✨
          </button>
        </form>

        {/* OUTPUT SECTION */}
        <div style={styles.outputSection}>
          <h2 style={styles.sectionHeading}>Your Generated Email</h2>
          {generatedEmail ? (
            <div style={styles.resultBox}>
              <pre style={styles.pre}>{generatedEmail}</pre>
              <button
                style={styles.copyBtn}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#e2e8f0")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#f1f5f9")
                }
                onClick={() => {
                  navigator.clipboard.writeText(generatedEmail);
                  alert("Copied to clipboard!");
                }}
              >
                Copy Text 📋
              </button>
            </div>
          ) : (
            <div style={styles.placeholderBox}>
              <p style={{ margin: 0, maxWidth: "320px", lineHeight: "1.5" }}>
                Your beautiful, customized email will appear here once you hit
                "Generate Email".
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
