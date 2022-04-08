import React, { useEffect, useState } from 'react'

const baseURL = "https://localhost:5001/api/auth";
const token = localStorage.getItem("token");

export default function CurrUserId() {
  const [id, setId] = useState(null);

  useEffect(() => {
    const getCurrUserId = async () => {
        try {
            const res = await fetch("http://localhost:5001/api/auth", {
                method: "GET",

                headers: {
                    "x-auth-token" : token
                }
            }) .then(res => res.json());

            setId(res._id);
        } catch(err) {
            console.log("Error in getCurrUserId");
        }
    }

    getCurrUserId();
})

  if (!id) return null;

  return id;
}
