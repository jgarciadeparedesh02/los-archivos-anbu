interface Cat {
    id: string;
    url: string;
}

const API_URL_RANDOM = "https://api.thecatapi.com/v1/images/search";
const API_URL_IMAGE = "https://api.thecatapi.com/v1/images/";

const loadCatButton = document.getElementById("load-cat-button") as HTMLButtonElement;
const addFavoriteButton = document.getElementById("add-favorite-button") as HTMLButtonElement;
const clearFavoritesButton = document.getElementById("clear-favorites-button") as HTMLButtonElement;
const catImage = document.getElementById("cat-image") as HTMLImageElement;
const favoritesContainer = document.getElementById("favorites-container") as HTMLDivElement;
const toast = document.getElementById("toast") as HTMLDivElement;

let currentCatId: string | null = null;

// -------------------------
// Mostrar notificación
// -------------------------
function showToast(message: string, type: "info" | "success" | "error" = "info"): void {
    toast.textContent = message;
    toast.className = `fixed bottom-5 right-5 text-white px-4 py-2 rounded-lg shadow-lg opacity-0 transition-opacity duration-500 ${type === "success"
            ? "bg-green-600"
            : type === "error"
                ? "bg-red-600"
                : "bg-gray-900"
        }`;
    toast.style.opacity = "1";
    setTimeout(() => (toast.style.opacity = "0"), 2500);
}

// -------------------------
// Cargar un gato aleatorio
// -------------------------
async function loadNewCat(): Promise<void> {
    try {
        const res = await fetch(API_URL_RANDOM);
        if (!res.ok) throw new Error("Error al obtener imagen de gato");

        const data: Cat[] = await res.json();
        const cat = data[0];
        currentCatId = cat.id;

        catImage.classList.add("opacity-0");
        setTimeout(() => {
            catImage.src = cat.url;
            catImage.onload = () => catImage.classList.remove("opacity-0");
        }, 200);
    } catch (error) {
        console.error(error);
        showToast("No se pudo cargar la imagen", "error");
    }
}

// -------------------------
// Guardar favorito
// -------------------------
function saveFavorite(catId: string): void {
    const favorites: string[] = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (!favorites.includes(catId)) {
        favorites.push(catId);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        renderFavorites();
        showToast("Gato añadido a favoritos", "success");
    } else {
        showToast("Este gato ya está en favoritos", "info");
    }
}

// -------------------------
// Eliminar un favorito
// -------------------------
function removeFavorite(catId: string): void {
    const favorites: string[] = JSON.parse(localStorage.getItem("favorites") || "[]");
    const updated = favorites.filter((id) => id !== catId);
    localStorage.setItem("favorites", JSON.stringify(updated));
    renderFavorites();
    showToast("Gato eliminado de favoritos", "error");
}

// -------------------------
// Eliminar todos los favoritos
// -------------------------
function clearAllFavorites(): void {
    const confirmDelete = confirm("¿Seguro que quieres eliminar todos los favoritos?");
    if (!confirmDelete) return;

    localStorage.removeItem("favorites");
    renderFavorites();
    showToast("Todos los favoritos fueron eliminados", "error");
}

// -------------------------
// Renderizar favoritos
// -------------------------
async function renderFavorites(): Promise<void> {
    favoritesContainer.innerHTML = "";
    const favorites: string[] = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (favorites.length === 0) {
        favoritesContainer.innerHTML = `<p class="text-gray-500 col-span-full text-center">No tienes gatos favoritos aún</p>`;
        return;
    }

    for (const catId of favorites) {
        try {
            const res = await fetch(`${API_URL_IMAGE}${catId}`);
            if (!res.ok) throw new Error("Error al obtener imagen del gato favorito");

            const cat: Cat = await res.json();

            const card = document.createElement("div");
            card.className =
                "bg-pink-50 rounded-xl shadow-md p-3 flex flex-col items-center transition hover:shadow-lg hover:scale-[1.02]";

            const imgWrapper = document.createElement("div");
            imgWrapper.className = "w-full h-52 overflow-hidden rounded-lg mb-3";
            const img = document.createElement("img");
            img.src = cat.url;
            img.alt = "Gato favorito";
            img.className = "w-full h-full object-cover";
            imgWrapper.appendChild(img);

            const btn = document.createElement("button");
            btn.textContent = "Eliminar";
            btn.className =
                "bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition";
            btn.addEventListener("click", () => removeFavorite(catId));

            card.appendChild(imgWrapper);
            card.appendChild(btn);
            favoritesContainer.appendChild(card);
        } catch (error) {
            console.error(error);
            showToast("Error al cargar un gato favorito", "error");
        }
    }
}

// -------------------------
// Eventos
// -------------------------
loadCatButton.addEventListener("click", loadNewCat);
addFavoriteButton.addEventListener("click", () => {
    if (currentCatId) saveFavorite(currentCatId);
});
clearFavoritesButton.addEventListener("click", clearAllFavorites);

// -------------------------
// Inicialización
// -------------------------
loadNewCat();
renderFavorites();
