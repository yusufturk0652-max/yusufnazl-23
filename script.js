// ❤️ Açılış Ekranı Buton Fonksiyonu (Sayfa yüklenir yüklenmez hazır olması için en başta)
window.enterSite = function() {
    const screen = document.getElementById("welcomeScreen");
    if (!screen) return;
    screen.style.transition = "opacity 0.8s ease";
    screen.style.opacity = "0";
    setTimeout(() => { 
        screen.style.display = "none"; 
        screen.style.pointerEvents = "none";
    }, 800);
};

// ❤️ Firebase Kütüphanelerini İçe Aktar
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, deleteDoc, doc, updateDoc, setDoc, getDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-firestore.js";

// 🚀 Senin Firebase Bilgilerin
const firebaseConfig = {
  apiKey: "AIzaSyBguWz2mShwdzekWPcs6kq9hsaKBNqMfd4",
  authDomain: "yusufnazli-97f9a.firebaseapp.com",
  projectId: "yusufnazli-97f9a",
  storageBucket: "yusufnazli-97f9a.firebasestorage.app",
  messagingSenderId: "587206596394",
  appId: "1:587206596394:web:e053ee52ad6ac45ed6b053",
  measurementId: "G-3PG0C0752Q"
};

// Firebase Başlatma
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// ❤️ Tarih Sayaçları
const startDate = new Date("2024-09-19T19:30:00");
function updateCounter() {
    const now = new Date();
    const difference = now - startDate;
    if (difference < 0) return;
    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if(document.getElementById("days")) {
        document.getElementById("days").innerHTML = days.toLocaleString("tr-TR");
        document.getElementById("hours").innerHTML = (hours % 24).toLocaleString("tr-TR");
        document.getElementById("minutes").innerHTML = (minutes % 60).toLocaleString("tr-TR");
        document.getElementById("seconds").innerHTML = (seconds % 60).toLocaleString("tr-TR");
    }
}
setInterval(updateCounter, 1000);
updateCounter();

// Kalp Yağmuru Animasyonu
function createHeart() {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "❤";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 20 + 12 + "px";
    heart.style.animationDuration = Math.random() * 4 + 4 + "s";
    document.body.appendChild(heart);
    setTimeout(() => { heart.remove(); }, 8000);
}
setInterval(createHeart, 350);

// Sayfa Sekme Değiştirme
window.showPage = function(pageId) {
    document.querySelectorAll(".page").forEach(section => section.classList.add("hidden"));
    document.querySelectorAll(".nav-btn").forEach(btn => btn.classList.remove("active"));
    document.getElementById(pageId).classList.remove("hidden");
    if(window.event && window.event.target) {
        window.event.target.classList.add("active");
    }
};

// Müzik Çalar
let music = document.getElementById("loveMusic");
let playing = false;
window.playMusic = function() {
    let btn = document.getElementById("playBtn");
    if (playing) {
        if(music) music.pause();
        btn.innerHTML = "▶️";
        playing = false;
    } else {
        if(music) music.play();
        btn.innerHTML = "⏸";
        playing = true;
    }
};

// Mektuplar
const loveMessages = [
    "Hayatıma girdiğin 19.09.2024 tarihinden beri her günüm seninle daha renkli, daha anlamlı...",
    "Nazlı'm... Gözlerine baktığımda huzuru buluyorum. İyi ki benim kaderim sensin...",
    "Dünyanın en güzel gülüşüne sahip sevgilim, iyi ki varsın..."
];
window.openLetter = function() {
    const randomIndex = Math.floor(Math.random() * loveMessages.length);
    document.getElementById("randomLetterText").innerHTML = loveMessages[randomIndex];
    document.getElementById("letterModal").classList.remove("hidden");
};
window.closeLetter = function() {
    document.getElementById("letterModal").classList.add("hidden");
};

// ❤️ VERİTABANI: Sevgi Seviyesi (Canlı)
let lovePercentage = 100;
async function fetchLoveLevel() {
    try {
        const loveRef = doc(db, "settings", "loveLevel");
        const docSnap = await getDoc(loveRef);
        if (docSnap.exists()) {
            lovePercentage = docSnap.data().value;
        } else {
            await setDoc(loveRef, { value: 100 });
        }
        updateLoveBarUI();
    } catch (e) {
        console.log("Hata:", e);
    }
}
fetchLoveLevel();

window.changeLove = async function(amount) {
    lovePercentage += amount;
    if (lovePercentage > 100) lovePercentage = 100;
    if (lovePercentage < 10) lovePercentage = 10;

    const loveRef = doc(db, "settings", "loveLevel");
    await setDoc(loveRef, { value: lovePercentage });
    updateLoveBarUI();
};

function updateLoveBarUI() {
    const bar = document.getElementById("loveProgress");
    const statusText = document.getElementById("loveStatusText");
    if(!bar || !statusText) return;

    bar.style.width = lovePercentage + "%";
    bar.innerHTML = lovePercentage + "%";

    if (lovePercentage >= 100) statusText.innerHTML = "Sonsuz Sevgi & Bağlılık ♾️❤️";
    else if (lovePercentage >= 70) statusText.innerHTML = "Harikayız, aşkımız tam gaz devam ediyor! 🥰";
    else if (lovePercentage >= 40) statusText.innerHTML = "Ufak atışmalar aşkın tuzu biberidir 😉❤️";
    else statusText.innerHTML = "Barışmak şart oldu, hemen sarılın! 🥺💕";
}

// 📖 VERİTABANI: Notlar (Aşk Defteri)
window.addNote = async function() {
    const input = document.getElementById("noteText");
    const text = input.value.trim();
    if (!text) return alert("Lütfen bir not yazın ❤️");

    await addDoc(collection(db, "notes"), {
        text: text,
        date: new Date().toLocaleString("tr-TR"),
        createdAt: Date.now()
    });
    input.value = "";
};

function loadNotes() {
    const list = document.getElementById("notesList");
    if (!list) return;
    onSnapshot(collection(db, "notes"), (snapshot) => {
        list.innerHTML = "";
        if (snapshot.empty) {
            list.innerHTML = "<p style='text-align:center; color:#ffccd5;'>Henüz eklenmiş özel bir not yok ❤️</p>";
            return;
        }
        let notesArr = [];
        snapshot.forEach(docSnap => {
            notesArr.push({ id: docSnap.id, ...docSnap.data() });
        });
        notesArr.sort((a, b) => b.createdAt - a.createdAt);

        notesArr.forEach(note => {
            list.innerHTML += `
                <div class="note-item">
                    <div class="note-text">${note.text}</div>
                    <div class="note-date">📅 ${note.date}</div>
                    <div class="note-actions">
                        <button class="delete-btn" onclick="deleteNote('${note.id}')">🗑️ Sil</button>
                    </div>
                </div>`;
        });
    });
}
loadNotes();

window.deleteNote = async function(id) {
    if (confirm("Silmek istediğinize emin misiniz?")) {
        await deleteDoc(doc(db, "notes", id));
    }
};

// 🎯 VERİTABANI: Yapılacaklar (Bucket List)
window.addTodo = async function() {
    const input = document.getElementById("todoInput");
    const text = input.value.trim();
    if (!text) return;

    await addDoc(collection(db, "todos"), {
        text: text,
        completed: false,
        createdAt: Date.now()
    });
    input.value = "";
};

window.toggleTodo = async function(id, currentStatus) {
    const todoRef = doc(db, "todos", id);
    await updateDoc(todoRef, { completed: !currentStatus });
};

window.deleteTodo = async function(id) {
    await deleteDoc(doc(db, "todos", id));
};

function loadTodos() {
    const list = document.getElementById("todoList");
    if (!list) return;
    onSnapshot(collection(db, "todos"), (snapshot) => {
        list.innerHTML = "";
        let todosArr = [];
        snapshot.forEach(docSnap => {
            todosArr.push({ id: docSnap.id, ...docSnap.data() });
        });
        todosArr.sort((a, b) => a.createdAt - b.createdAt);

        todosArr.forEach(todo => {
            list.innerHTML += `
                <li class="todo-item ${todo.completed ? 'completed' : ''}">
                    <span onclick="toggleTodo('${todo.id}', ${todo.completed})">${todo.completed ? '✅' : '⭕'} ${todo.text}</span>
                    <button onclick="deleteTodo('${todo.id}')">🗑️</button>
                </li>`;
        });
    });
}
loadTodos();

// Tema Değiştirme
window.changeTheme = function() {
    document.body.classList.toggle("night");
    document.body.classList.toggle("day");
    let btn = document.getElementById("themeBtn");
    btn.innerHTML = document.body.classList.contains("day") ? "🌙 Gece Modu" : "☀️ Gündüz Modu";
};