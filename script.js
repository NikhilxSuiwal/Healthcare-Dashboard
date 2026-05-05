// Patient selected from HTML

const patientProfile = document.getElementById("profile-pic");
const patientName = document.getElementById("patient-name");
const patientDob = document.getElementById("dob");
const patientGender = document.getElementById("gender");
const patientPhone = document.getElementById("phone");
const patientEmergency = document.getElementById("emergency-ph");
const patientInsurance = document.getElementById("insurance");

// Diagnostic list  selected from HTML
const listContainer = document.getElementById("diagnostic-list");
// clear old data
listContainer.innerHTML = "";

// Lab Results list 
const labList = document.getElementById("lab-results");
labList.innerHTML = "";

// Patient List data
const patientList = document.getElementById("patient-list");
patientList.innerHTML = "";

// Chart data
const chart = document.getElementById("myChart")

// Systolic Data
const sysValue = document.querySelector(".sys h3");
const sysText = document.querySelector(".sys p")

// Diastolic Data
const diaValue = document.querySelector(".dia h3")
const diaText = document.querySelector(".dia p")

// Cards 
const respValue = document.querySelector(".resp-card h3");
const respText = document.querySelector(".resp-card p");

const tempValue = document.querySelector(".temp-card h3");
const tempText = document.querySelector(".temp-card p");

const heartValue = document.querySelector(".heart-card h3");
const heartText = document.querySelector(".heart-card p");



// API fetch with authentication
fetch("https://fedskillstest.coalitiontechnologies.workers.dev/", {
    headers: {
        "Authorization": "Basic " + btoa("coalition:skills-test")
    }
})
    .then(res => res.json())
    .then(data => {
        const patient = data.find(p => p.name === "Jessica Taylor")
        console.log(patient);

        // Patient data insert in UI
        patientName.textContent = patient.name;
        patientProfile.src = patient.profile_picture;
        patientDob.textContent = patient.date_of_birth;
        patientGender.textContent = patient.gender;
        patientPhone.textContent = patient.phone_number
        patientEmergency.textContent = patient.emergency_contact;
        patientInsurance.textContent = patient.insurance_type

        // Add data in Diagonstic-List
        patient.diagnostic_list.forEach(item => {
            const div = document.createElement("div");
            div.classList.add("list");

            div.innerHTML = `
        <h5>${item.name}</h5>
        <h5>${item.description}</h5> 
        <h5>${item.status}</h5> 
        `;

            listContainer.appendChild(div);
        })

        // Lab list data
        patient.lab_results.forEach(item => {
            const div = document.createElement("div");
            div.classList.add("test");

            div.innerHTML = `
            <h5>${item}</h5>
            <img src="./Assets/download_FILL0_wght300_GRAD0_opsz24 (1).svg" alt="">
        `;

            labList.appendChild(div);
        })

        // Patient List data update we use data coz we want all patient list
        data.forEach(p => {
            const div = document.createElement("div");
            div.classList.add("patients")
            if (p.name === "Jessica Taylor") {
                div.classList.add("active-patient");
            }        

            div.innerHTML = `
        <div class="data">
            <img src="${p.profile_picture.split(' ')[0]}" alt="">
            <div class="patient-name">
                <h4>${p.name}</h4>
                <p>${p.gender}, ${p.age}</p>
            </div>
        </div>
        <div class="h-dot">
            <img src="./Assets/horizontal-dots/more_horiz_FILL0_wght300_GRAD0_opsz24@2x.png" alt="">
        </div>
        `;

            patientList.appendChild(div);

            div.addEventListener("click", () => {
                patientName.textContent = p.name;
                patientProfile.src = p.profile_picture;
                patientDob.textContent = p.date_of_birth;
                patientGender.textContent = p.gender;
                patientPhone.textContent = p.phone_number;
                patientEmergency.textContent = p.emergency_contact;
                patientInsurance.textContent = p.insurance_type;
            })
        })

        // Chart data
        const lastSixMonths = patient.diagnosis_history.slice(0, 6).reverse();

        const labels = lastSixMonths.map(item => `${item.month.slice(0, 3)}, ${item.year}`);
        const systolicData = lastSixMonths.map(item => item.blood_pressure.systolic.value);
        const diastolicData = lastSixMonths.map(item => item.blood_pressure.diastolic.value);

        // Render Chart
        new Chart(chart, {
            type: "line",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Systolic",
                        data: systolicData,
                        borderColor: "#E66FD2",
                        tension: 0.5
                    },
                    {
                        label: "Diastolic",
                        data: diastolicData,
                        borderColor: "#8C6FE6",
                        tension: 0.5
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        })

        // Systolic data
        const latest = patient.diagnosis_history[0];

        sysValue.textContent = latest.blood_pressure.systolic.value;
        sysText.innerHTML = `
            <img src="./Assets/ArrowUp/ArrowUp@2x.png" alt="">
            ${latest.blood_pressure.systolic.levels}
        `;

        // Diastolic Data
        diaValue.textContent = latest.blood_pressure.diastolic.value;
        diaText.innerHTML = `
            <img src="./Assets/ArrowDown.svg" alt="">
            ${latest.blood_pressure.diastolic.levels}
        `;

        // Respiratory card
        respValue.textContent = `${latest.respiratory_rate.value} bpm`;
        respText.textContent = latest.respiratory_rate.levels;

        // Temperature
        tempValue.textContent = `${latest.temperature.value}°F`;
        tempText.textContent = latest.temperature.levels;

        // Heart Rate
        heartValue.textContent = `${latest.heart_rate.value} bpm`;
        heartText.innerHTML = `
            <img src="./Assets/ArrowDown.svg" alt="">
            ${latest.heart_rate.levels}
        `;

    })









