// ============================================
// FLOATING CONTACT BUTTONS
// Fixed Left Side - Vietnamese Ecommerce Style
// ============================================
import { useState } from "react";

const FloatingContactButtons = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const contacts = [
    {
      name: "phone",
      href: "tel:0888999888",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
      label: "Gọi điện",
      bgColor: "bg-red-500",
      hoverBgColor: "hover:bg-red-600",
      shadowColor: "shadow-red-500/40",
      show: true,
    },
    {
      name: "messenger",
      href: "https://m.me/nhatminhsmarthome",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111S18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8.2l3.131 3.26L19.752 8.2l-6.561 6.763z"/>
        </svg>
      ),
      label: "Messenger",
      bgColor: "bg-blue-600",
      hoverBgColor: "hover:bg-blue-700",
      shadowColor: "shadow-blue-500/40",
      show: true,
    },
    {
      name: "zalo",
      href: "https://zalo.me/0888999888",
      icon: (
        <svg width="32" height="32" viewBox="0 0 1024 1024" fill="currentColor">
          <path d="M713.5 621.5c-45.9-14.6-74.5-36.2-74.5-36.2-2.8-1.6-6.1 0.3-6.1 3.5v52.3c0 2.2 1.6 3.7 3.4 3.2 45.9-14.6 74.5-36.2 74.5-36.2 2.8-1.6 6.1 0.3 6.1 3.5v52.3c0 2.2 1.6 3.7 3.4 3.2 45.9-14.6 74.5-36.2 74.5-36.2 2.8-1.6 6.1 0.3 6.1 3.5v52.3c0 2.2 1.6 3.7 3.4 3.2 56.1-17.8 91.1-45.6 91.1-45.6 2.8-1.6 2.9-5.7 0.2-7.6 0 0-35.1-27.7-91.1-45.6-18.6-5.9-35.8-10.7-50.9-14.2 -7.3-1.7-14.1 3.5-14.1 10.8v39.7c0 6.3-5.3 11.4-11.7 11.4 -6.4 0-11.7-5.1-11.7-11.4v-39.7c0-6.3-5.3-11.4-11.7-11.4 -6.4 0-11.7 5.1-11.7 11.4v39.7c0 6.3-5.3 11.4-11.7 11.4 -6.4 0-11.7-5.1-11.7-11.4v-39.7c0-6.3-5.3-11.4-11.7-11.4 -6.4 0-11.7 5.1-11.7 11.4v39.7c0 6.3-5.3 11.4-11.7 11.4 -6.4 0-11.7-5.1-11.7-11.4v-39.7c0-6.3-5.3-11.4-11.7-11.4 -6.4 0-11.7 5.1-11.7 11.4v39.7c0 6.3-5.3 11.4-11.7 11.4 -6.4 0-11.7-5.1-11.7-11.4v-39.7c0-7.3-6.8-12.5-14.1-10.8 -15.1 3.5-32.3 8.3-50.9 14.2 -56.1 17.8-91.1 45.6-91.1 45.6 -2.8 1.9-2.6 6 0.2 7.6 0 0 35 27.7 91.1 45.6 1.8 0.6 3.4-1 3.4-3.2v-52.3c0-3.2 3.3-5.1 6.1-3.5 0 0 28.6 21.6 74.5 36.2 1.8 0.6 3.4-1 3.4-3.2v-52.3c0-3.2 3.3-5.1 6.1-3.5 0 0 28.6 21.6 74.5 36.2 1.8 0.6 3.4-1 3.4-3.2v-52.3c0-3.2 3.3-5.1 6.1-3.5 0 0 28.6 21.6 74.5 36.2 1.8 0.6 3.4-1 3.4-3.2v-52.3c0-3.2 3.3-5.1 6.1-3.5 0 0 28.6 21.6 74.5 36.2 1.8 0.6 3.4-1 3.4-3.2v-52.3c0-3.2 3.3-5.1 6.1-3.5 0 0 28.6 21.6 74.5 36.2 1.8 0.6 3.4-1 3.4-3.2v-52.3c0-3.2 3.3-5.1 6.1-3.5 0 0 28.6 21.6 74.5 36.2 1.8 0.6 3.4-1 3.4-3.2v-52.3c0-3.2 3.3-5.1 6.1-3.5 0 0 28.6 21.6 74.5 36.2 1.8 0.6 3.4-1 3.4-3.2v-52.3c0-3.2 3.3-5.1 6.1-3.5 0 0 28.6 21.6 74.5 36.2 1.8 0.6 3.4-1 3.4-3.2v-52.3c0-3.2 3.3-5.1 6.1-3.5z"/>
        </svg>
      ),
      label: "Zalo",
      bgColor: "bg-blue-600",
      hoverBgColor: "hover:bg-blue-700",
      shadowColor: "shadow-blue-500/40",
      size: "large",
      show: true,
    },
  ];

  return (
    <>
      <style>{floatingStyles}</style>
      <div className="floating-contact-container">
        {/* Main Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`
            floating-toggle-btn
            ${isExpanded ? "expanded" : ""}
            bg-gradient-to-br from-primary-600 to-accent
            shadow-lg shadow-primary-500/40
          `}
          aria-label="Liên hệ"
        >
          <span className={`toggle-icon ${isExpanded ? "rotate" : ""}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </span>
        </button>

        {/* Contact Buttons */}
        <div className={`contact-buttons ${isExpanded ? "visible" : ""}`}>
          {contacts.map((contact, index) => (
            <a
              key={contact.name}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                contact-btn
                ${contact.bgColor} ${contact.hoverBgColor}
                shadow-lg ${contact.shadowColor}
                ${contact.size === "large" ? "contact-btn-large" : ""}
              `}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="contact-icon">{contact.icon}</span>
              <span className="contact-label">{contact.label}</span>
            </a>
          ))}
        </div>

        {/* Pulse Animation for Toggle */}
        {!isExpanded && (
          <div className="pulse-ring" />
        )}
      </div>
    </>
  );
};

const floatingStyles = `
  /* ==================== CONTAINER ==================== */
.floating-contact-container {
  position: fixed;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 50;
  isolation: isolate;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

  /* ==================== TOGGLE BUTTON ==================== */
  .floating-toggle-btn {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    border: none;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    position: relative;
    pointer-events: auto;
  }

  .floating-toggle-btn:hover {
    transform: scale(1.1);
  }

  .floating-toggle-btn.expanded {
    background: linear-gradient(135deg, #64748b, #475569);
  }

  .toggle-icon {
    transition: transform 0.3s ease;
  }

  .toggle-icon.rotate {
    transform: rotate(180deg);
  }

  /* ==================== CONTACT BUTTONS ==================== */
  .contact-buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    opacity: 0;
    transform: translateX(-20px);
    pointer-events: none;
    transition: all 0.3s ease;
  }

  .contact-buttons.visible {
    opacity: 1;
    transform: translateX(0);
    pointer-events: auto;
  }

  /* ==================== INDIVIDUAL CONTACT BUTTON ==================== */
  .contact-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    color: white;
    text-decoration: none;
    transition: all 0.25s ease;
    position: relative;
    animation: slideInLeft 0.3s ease forwards;
    opacity: 0;
  }

  .contact-btn-large {
    width: 56px;
    height: 56px;
  }

  .contact-btn:hover {
    transform: scale(1.15) translateX(4px);
  }

  .contact-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .contact-label {
    position: absolute;
    left: 100%;
    margin-left: 12px;
    white-space: nowrap;
    background: white;
    color: #0f172a;
    padding: 6px 12px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 600;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    opacity: 0;
    pointer-events: none;
    transition: all 0.2s ease;
  }

  .contact-label::before {
    content: "";
    position: absolute;
    right: 100%;
    top: 50%;
    transform: translateY(-50%);
    border: 6px solid transparent;
    border-right-color: white;
  }

  .contact-btn:hover .contact-label {
    opacity: 1;
    transform: translateX(4px);
  }

  /* ==================== PULSE ANIMATION ==================== */
  .pulse-ring {
    position: absolute;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: rgba(37, 99, 235, 0.4);
    animation: pulse 2s infinite;
    top: 0;
    left: 0;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(1.5);
      opacity: 0;
    }
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  /* ==================== RESPONSIVE ==================== */
  @media (max-width: 768px) {
    .floating-contact-container {
      left: 12px;
      gap: 8px;
    }

    .floating-toggle-btn {
      width: 46px;
      height: 46px;
    }

    .contact-btn {
      width: 42px;
      height: 42px;
    }

    .contact-btn-large {
      width: 48px;
      height: 48px;
    }

    .pulse-ring {
      width: 46px;
      height: 46px;
    }
  }

  @media (max-width: 480px) {
    .contact-label {
      display: none;
    }
  }

  /* Hide on very small screens */
  @media (max-width: 360px) {
    .floating-contact-container {
      display: none;
    }
  }
`;

export default FloatingContactButtons;
