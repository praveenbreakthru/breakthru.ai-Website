import { useState } from "react";
import { Link } from "react-router-dom";
import servicesGif from "../assets/services.gif";

const InfinityHub = () => {
  const [activePanel, setActivePanel] = useState(null);

  const togglePanel = (side, e) => {
    e.stopPropagation();
    setActivePanel((prev) => (prev === side ? null : side));
  };

  const closePanels = (e) => {
    if (!e.target.closest(".panel")) {
      setActivePanel(null);
    }
  };

  // Helper Component for the 3D Hub Buttons
  const HubButton = ({ href, onClick, icon, label, position, glowColor }) => {
    const [isHovered, setIsHovered] = useState(false);

    const baseStyle = {
      position: "absolute",
      top: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 40,
      width: "68px", // Reduced from 82px
      height: "68px", // Reduced from 82px
      borderRadius: "50%",
      border: `1px solid rgba(255, 255, 255, ${isHovered ? "0.4" : "0.2"})`,
      background: `rgba(255, 255, 255, ${isHovered ? "0.15" : "0.1"})`,
      backdropFilter: "blur(12px)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      textDecoration: "none",
      boxShadow: isHovered 
        ? `0 0 40px ${glowColor}66, 0 0 20px ${glowColor}33`
        : `0 0 30px rgba(255, 255, 255, 0.15)`,
      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      scale: isHovered ? "1.15" : "1",
      ...position
    };

    const content = (
      <>
        <img 
          src={icon} 
          alt={label}
          style={{
            width: "60%",
            height: "60%",
            objectFit: "contain",
            filter: `drop-shadow(0 0 10px ${isHovered ? glowColor : "rgba(255,255,255,0.3)"})`,
            transition: "all 0.4s ease",
            transform: isHovered ? "rotate(5deg) scale(1.1)" : "none"
          }}
        />
        <span style={{
          fontSize: "8px", // Reduced from 9px
          fontWeight: "900",
          color: "#ffffff",
          marginTop: "-1px",
          letterSpacing: "1px",
          fontFamily: "'Inter', sans-serif",
          textShadow: `0 0 10px ${isHovered ? glowColor : "rgba(255,255,255,0.5)"}`,
          opacity: isHovered ? 1 : 0.8
        }}>
          {label}
        </span>
      </>
    );

    if (href) {
      return (
        <Link 
          to={href} 
          onClick={onClick} 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={baseStyle}
        >
          {content}
        </Link>
      );
    }

    return (
      <div 
        onClick={onClick} 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={baseStyle}
      >
        {content}
      </div>
    );
  };

  return (
    <div
      onClick={closePanels}
      style={{
        position: "relative",
        width: "100%",
        height: "300px", // Reduced from 360px
        background: "transparent",
        marginTop: "0px", 
        marginBottom: "-25px", 
      }}
    >
      {/* CENTER HUB */}
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        {/* LEFT CLICK AREA */}
        <div
          onClick={(e) => togglePanel("left", e)}
          style={{
            position: "absolute",
            left: 0,
            width: "35%",
            height: "100%",
            cursor: "pointer",
            zIndex: 10,
          }}
        />

        {/* RIGHT CLICK AREA */}
        <div
          onClick={(e) => togglePanel("right", e)}
          style={{
            position: "absolute",
            right: 0,
            width: "35%",
            height: "100%",
            cursor: "pointer",
            zIndex: 10,
          }}
        />

        {/* GIF Infinity Container */}
        <div
          style={{
            position: "relative",
            width: "650px", // Reduced from 850px
            height: "300px", // Reduced from 400px
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "visible"
          }}
        >
          <img
            src={servicesGif}
            alt="Infinity Loop"
            style={{
              width: "100%",
              height: "auto",
              mixBlendMode: "screen",
              objectFit: "contain",
              filter: "contrast(1.2) brightness(1.1)",
              pointerEvents: "none"
            }}
          />

          {/* HUB BUTTONS */}
          
          <HubButton 
            label="PRODUCTS"
            icon="https://cdn3d.iconscout.com/3d/premium/thumb/product-3d-icon-png-download-4863042.png"
            position={{ left: "28%" }}
            glowColor="#00f2ff"
            onClick={(e) => togglePanel("left", e)}
          />

          <HubButton 
            href="/story/breakthru-labs"
            label="LABS"
            icon="https://cdn3d.iconscout.com/3d/premium/thumb/erlenmeyer-flask-3d-icon-png-download-8307202.png"
            position={{ left: "50%" }}
            glowColor="#ffffff"
            onClick={(e) => e.stopPropagation()}
          />

          <HubButton 
            label="ENTERPRISES"
            icon="https://cdn3d.iconscout.com/3d/premium/thumb/enterprise-3d-icon-png-download-6184563.png"
            position={{ left: "72%" }}
            glowColor="#ff9d00"
            onClick={(e) => togglePanel("right", e)}
          />

        </div>
      </div>
    </div>
  );
};

export default InfinityHub;