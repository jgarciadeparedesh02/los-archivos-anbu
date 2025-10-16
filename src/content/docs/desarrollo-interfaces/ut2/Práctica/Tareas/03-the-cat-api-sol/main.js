var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var API_URL_RANDOM = "https://api.thecatapi.com/v1/images/search";
var API_URL_IMAGE = "https://api.thecatapi.com/v1/images/";
var loadCatButton = document.getElementById("load-cat-button");
var addFavoriteButton = document.getElementById("add-favorite-button");
var clearFavoritesButton = document.getElementById("clear-favorites-button");
var catImage = document.getElementById("cat-image");
var favoritesContainer = document.getElementById("favorites-container");
var toast = document.getElementById("toast");
var currentCatId = null;
// -------------------------
// Mostrar notificación
// -------------------------
function showToast(message, type) {
    if (type === void 0) { type = "info"; }
    toast.textContent = message;
    toast.className = "fixed bottom-5 right-5 text-white px-4 py-2 rounded-lg shadow-lg opacity-0 transition-opacity duration-500 ".concat(type === "success"
        ? "bg-green-600"
        : type === "error"
            ? "bg-red-600"
            : "bg-gray-900");
    toast.style.opacity = "1";
    setTimeout(function () { return (toast.style.opacity = "0"); }, 2500);
}
// -------------------------
// Cargar un gato aleatorio
// -------------------------
function loadNewCat() {
    return __awaiter(this, void 0, void 0, function () {
        var res, data, cat_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(API_URL_RANDOM)];
                case 1:
                    res = _a.sent();
                    if (!res.ok)
                        throw new Error("Error al obtener imagen de gato");
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    cat_1 = data[0];
                    currentCatId = cat_1.id;
                    catImage.classList.add("opacity-0");
                    setTimeout(function () {
                        catImage.src = cat_1.url;
                        catImage.onload = function () { return catImage.classList.remove("opacity-0"); };
                    }, 200);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error(error_1);
                    showToast("No se pudo cargar la imagen", "error");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// -------------------------
// Guardar favorito
// -------------------------
function saveFavorite(catId) {
    var favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (!favorites.includes(catId)) {
        favorites.push(catId);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        renderFavorites();
        showToast("Gato añadido a favoritos", "success");
    }
    else {
        showToast("Este gato ya está en favoritos", "info");
    }
}
// -------------------------
// Eliminar un favorito
// -------------------------
function removeFavorite(catId) {
    var favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    var updated = favorites.filter(function (id) { return id !== catId; });
    localStorage.setItem("favorites", JSON.stringify(updated));
    renderFavorites();
    showToast("Gato eliminado de favoritos", "error");
}
// -------------------------
// Eliminar todos los favoritos
// -------------------------
function clearAllFavorites() {
    var confirmDelete = confirm("¿Seguro que quieres eliminar todos los favoritos?");
    if (!confirmDelete)
        return;
    localStorage.removeItem("favorites");
    renderFavorites();
    showToast("Todos los favoritos fueron eliminados", "error");
}
// -------------------------
// Renderizar favoritos
// -------------------------
function renderFavorites() {
    return __awaiter(this, void 0, void 0, function () {
        var favorites, _loop_1, _i, favorites_1, catId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    favoritesContainer.innerHTML = "";
                    favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
                    if (favorites.length === 0) {
                        favoritesContainer.innerHTML = "<p class=\"text-gray-500 col-span-full text-center\">No tienes gatos favoritos a\u00FAn</p>";
                        return [2 /*return*/];
                    }
                    _loop_1 = function (catId) {
                        var res, cat, card, imgWrapper, img, btn, error_2;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 3, , 4]);
                                    return [4 /*yield*/, fetch("".concat(API_URL_IMAGE).concat(catId))];
                                case 1:
                                    res = _b.sent();
                                    if (!res.ok)
                                        throw new Error("Error al obtener imagen del gato favorito");
                                    return [4 /*yield*/, res.json()];
                                case 2:
                                    cat = _b.sent();
                                    card = document.createElement("div");
                                    card.className =
                                        "bg-pink-50 rounded-xl shadow-md p-3 flex flex-col items-center transition hover:shadow-lg hover:scale-[1.02]";
                                    imgWrapper = document.createElement("div");
                                    imgWrapper.className = "w-full h-52 overflow-hidden rounded-lg mb-3";
                                    img = document.createElement("img");
                                    img.src = cat.url;
                                    img.alt = "Gato favorito";
                                    img.className = "w-full h-full object-cover";
                                    imgWrapper.appendChild(img);
                                    btn = document.createElement("button");
                                    btn.textContent = "Eliminar";
                                    btn.className =
                                        "bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition";
                                    btn.addEventListener("click", function () { return removeFavorite(catId); });
                                    card.appendChild(imgWrapper);
                                    card.appendChild(btn);
                                    favoritesContainer.appendChild(card);
                                    return [3 /*break*/, 4];
                                case 3:
                                    error_2 = _b.sent();
                                    console.error(error_2);
                                    showToast("Error al cargar un gato favorito", "error");
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, favorites_1 = favorites;
                    _a.label = 1;
                case 1:
                    if (!(_i < favorites_1.length)) return [3 /*break*/, 4];
                    catId = favorites_1[_i];
                    return [5 /*yield**/, _loop_1(catId)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// -------------------------
// Eventos
// -------------------------
loadCatButton.addEventListener("click", loadNewCat);
addFavoriteButton.addEventListener("click", function () {
    if (currentCatId)
        saveFavorite(currentCatId);
});
clearFavoritesButton.addEventListener("click", clearAllFavorites);
// -------------------------
// Inicialización
// -------------------------
loadNewCat();
renderFavorites();
