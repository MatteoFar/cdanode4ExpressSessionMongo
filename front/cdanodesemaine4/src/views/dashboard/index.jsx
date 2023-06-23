import React, { useEffect } from "react";
import apiService from "../../service";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  let navigate = useNavigate();

  async function handleSession() {
    const m = await apiService.getDashboard();
    console.log(m.response);
    if (m.response.status === 403) {
      navigate("/");
    }
  }

  useEffect(() => {
    handleSession();
  }, []);

  return (
    <div>
      <h1>Bienvenue !</h1>
    </div>
  );
}
