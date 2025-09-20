import { useState, useEffect } from "react";

export default function Practical3(){
    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(()=> {
            setDateTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour12: true,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return(
        <div style={styles.container}>
            <div style={styles.overlay}></div>
            <div style={styles.content}>
                <div style={styles.header}>
                    <h1 style={styles.title}>🎓 Welcome to CHARUSAT University</h1>
                    <p style={styles.tagline}>Charotar University of Science and Technology</p>
                </div>
                
                <div style={styles.clockContainer}>
                    <div style={styles.digitalClock}>
                        <div style={styles.timeDisplay}>{formatTime(dateTime)}</div>
                        <div style={styles.dateDisplay}>{formatDate(dateTime)}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundImage: "url('https://www.reviewadda.com/assets/uploads/article_images/Charusat_University_Gujarat.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 100%)",
    zIndex: 1,
  },
  content: {
    position: "relative",
    zIndex: 2,
    color: "white",
    textAlign: "center",
    maxWidth: "800px",
    width: "100%",
  },
  header: {
    marginBottom: "40px",
  },
  title: {
    fontSize: "4.5em",
    marginBottom: "20px",
    fontWeight: "800",
    fontFamily: "'Playfair Display', 'Georgia', serif",
    color: "#FFD700",
    textShadow: "3px 3px 0px #FF6B35, 6px 6px 10px rgba(0,0,0,0.8)",
    letterSpacing: "2px",
    textTransform: "uppercase",
    lineHeight: "1.1",
  },
  tagline: {
    fontSize: "1.2em",
    opacity: 0.9,
    textShadow: "1px 1px 3px rgba(0,0,0,0.7)",
    fontWeight: "300",
  },
  clockContainer: {
    marginBottom: "40px",
  },
  digitalClock: {
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "20px",
    padding: "30px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
    animation: "pulse 2s ease-in-out infinite",
  },
  timeDisplay: {
    fontSize: "4em",
    fontWeight: "bold",
    marginBottom: "10px",
    textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
    fontFamily: "'Courier New', monospace",
    letterSpacing: "2px",
  },
  dateDisplay: {
    fontSize: "1.3em",
    opacity: 0.9,
    textShadow: "1px 1px 2px rgba(0,0,0,0.7)",
  },

};