import { useState, useEffect } from "react";

export default function AutoSaveForm() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        age: ""
    });

    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState("Idle"); // Idle | Saving | Saved | Restored
    const [lastSaved, setLastSaved] = useState(null); // timestamp of last save

    // ---------- LOAD SAVED DATA ON MOUNT ----------
    useEffect(() => {
        const savedData = localStorage.getItem("autosaveForm");
        const savedTimestamp = localStorage.getItem("autosaveTimestamp");
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            setForm(parsedData);
            setErrors(validate(parsedData)); // restore validation
            setStatus("Restored");
            if (savedTimestamp) setLastSaved(new Date(savedTimestamp));
        }
    }, []);

    // ---------- VALIDATION ----------
    const validate = (fields) => {
        const newErrors = {};

        if (!fields.name.trim()) newErrors.name = "Name is required";

        if (!fields.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(fields.email)) {
            newErrors.email = "Email is invalid";
        }

        if (!fields.age.trim()) {
            newErrors.age = "Age is required";
        } else if (isNaN(fields.age) || fields.age <= 0) {
            newErrors.age = "Age must be a positive number";
        }

        return newErrors;
    };

    // ---------- HANDLE INPUT CHANGES ----------
    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // ---------- AUTO SAVE ----------
    useEffect(() => {
        const newErrors = validate(form);
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return; // don't save if invalid

        setStatus("Saving");

        const timeout = setTimeout(() => {
            const now = new Date();
            localStorage.setItem("autosaveForm", JSON.stringify(form));
            localStorage.setItem("autosaveTimestamp", now.toISOString());
            setStatus("Saved");
            setLastSaved(now);
        }, 600); // debounce

        return () => clearTimeout(timeout);
    }, [form]);

    return (
        <div style={{ maxWidth: 400, margin: "auto" }}>
            <h2>Auto-Saving Form</h2>
            <p>Status: {status}</p>
            {lastSaved && <p>Last saved: {lastSaved.toLocaleTimeString()}</p>}

            {/* NAME */}
            <label>
                Name:
                <input name="name" value={form.name} onChange={handleChange} />
            </label>
            {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

            {/* EMAIL */}
            <label>
                Email:
                <input name="email" value={form.email} onChange={handleChange} />
            </label>
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

            {/* AGE */}
            <label>
                Age:
                <input
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                    type="number"
                />
            </label>
            {errors.age && <p style={{ color: "red" }}>{errors.age}</p>}
        </div>
    );
}
