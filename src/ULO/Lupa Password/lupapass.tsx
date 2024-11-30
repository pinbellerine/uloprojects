import { Component, createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import "./lupapass.css";
import lupapassimg from '../Lupa Password/lupapass.svg';

const LupaPass: Component = () => {
  const navigate = useNavigate();
  const [view, setView] = createSignal("reset"); // Initial view is 'reset'
  const [otp, setOtp] = createSignal(""); // Signal for the OTP input
  const [email, setEmail] = createSignal(""); // Signal for the user's email
  const [newPassword, setNewPassword] = createSignal(""); // Signal for new password input

  const handleResetPassword = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/send_otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email() }),
      });
      if (response.ok) {
        setView("checkEmail"); // Switch to the check email view
      } else {
        console.error("Error sending OTP:", await response.text());
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const handleVerifyPassword = () => {
    setView("otp"); // Show the OTP modal
  };

  const handleOtpVerification = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/verify_otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email(), otp: otp() }),
      });
      if (response.ok) {
        setView("newPassword"); // Proceed to the new password input if OTP is valid
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("OTP verification error:", error);
    }
  };

  const handlePasswordResetSuccess = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/reset_password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email(), new_password: newPassword() }),
      });
      if (response.ok) {
        setView("success"); // Show success message on password reset
      } else {
        console.error("Password reset error:", await response.text());
      }
    } catch (error) {
      console.error("Password reset error:", error);
    }
  };

  return (
    <div class="container-syauqiy">
      {view() === "reset" && (
        <div class="left-section">
          <h1 class="reset-title">ULO.</h1>
          <h2 class="reset-subtitle">Lupa password?</h2>
          <p class="reset-text">Jangan khawatir, kami akan mengirimkan petunjuk <br />
            pengaturan ulang kepada anda.</p>
          <input 
            type="email" 
            placeholder="Masukan email anda" 
            value={email()}
            onInput={(e) => setEmail(e.currentTarget.value)}
          />
          <button onClick={handleResetPassword}>Reset kata sandi</button>
          <a href="#" onClick={() => navigate("/login")}>← Kembali ke login</a>
        </div>
      )}

      {view() === "checkEmail" && (
        <div class="left-section">
          <h1 class="check-title">ULO.</h1>
          <h2 class="check-subtitle">Periksa email anda</h2>
          <p class="check-text">
            Kami mengirimkan tautan pengaturan ulang kata sandi ke {email()}
          </p>
          <button onClick={handleVerifyPassword}>Verifikasi kata sandi</button>
          <p class="resend-text">Belum menerima email? <a href="#" onClick={handleResetPassword}>kirim ulang</a></p>
          <a href="#" onClick={() => navigate("/login")}>← Kembali ke login</a>
        </div>
      )}

      {view() === "otp" && (
        <div class="otp-modal">
          <h2 class="otp-title">Masukan kode OTP</h2>
          <p class="otp-text">Kami mengirimkan kode OTP ke email anda.</p>
          <input
            type="text"
            maxLength="4"
            value={otp()}
            onInput={(e) => setOtp(e.currentTarget.value)}
            class="otp-input"
            placeholder="____"
          />
          <button onClick={handleOtpVerification}>Verifikasi OTP</button>
        </div>
      )}

      {view() === "newPassword" && (
        <div class="left-section">
          <h1 class="newpassword-title">ULO.</h1>
          <h2 class="newpassword-subtitle">Masukan kata sandi baru</h2>
          <div>
            <label>Kata sandi</label>
            <input 
              type="password" 
              placeholder="Masukan kata sandi baru" 
              value={newPassword()}
              onInput={(e) => setNewPassword(e.currentTarget.value)}
            />
            <small class="password-hint">Harus minimal 8 karakter</small>
          </div>
          <button onClick={handlePasswordResetSuccess}>Reset kata sandi</button>
          <a href="#" onClick={() => navigate("/login")}>← Kembali ke login</a>
        </div>
      )}

      {view() === "success" && (
        <div class="left-section">
          <h1 class="success-title">ULO.</h1>
          <h2 class="success-subtitle">Reset kata sandi</h2>
          <p class="success-text">Kata sandi anda telah berhasil direset. Klik di bawah untuk melanjutkan.</p>
          <button onClick={() => navigate("/login")}>Lanjutkan</button>
          <a href="#" onClick={() => navigate("/login")}>← Kembali ke login</a>
        </div>
      )}

      <div class="right-section">
        <img
          src={lupapassimg}
          alt="Illustration of a person standing next to a large mobile phone displaying a password input screen with a lock icon and a 'Done' button."
          width="500"
          height="500"
        />
      </div>
    </div>
  );
};

export default LupaPass;
