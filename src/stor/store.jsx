import { createSlice, configureStore } from "@reduxjs/toolkit";

/** Slice برای پیجینیشن */
const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    currentPage: 1, // صفحه فعلی
    itemsPerPage: 4, // تعداد آیتم‌ها در هر صفحه
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    nextPage: (state) => {
      state.currentPage += 1;
    },
    prevPage: (state) => {
      state.currentPage = Math.max(1, state.currentPage - 1); // حداقل صفحه 1
    },
    jumpToPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

/** Slice برای دسته بندی محصولات */
const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },

    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.category_id !== action.payload
      );
    },
    updateProduct: (state, action) => {
      const { id, updatedData } = action.payload;
      const productIndex = state.products.findIndex((p) => p.id === id);
      if (productIndex !== -1) {
        state.products[productIndex] = {
          ...state.products[productIndex],
          ...updatedData,
        };
      }
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
  },
});
/**برای  سبد خرید */
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: JSON.parse(localStorage.getItem("carts")) || [], // بازیابی از localStorage
  },
  reducers: {
    addToCart: (state, action) => {
      const item = state.carts.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.carts.push({ ...action.payload, quantity: 1 });
      }
    },
    deleteProductCart: (state, action) => {
      state.carts = state.carts.filter((i) => i.id !== action.payload.id);
    },
    setCarts: (state, action) => {
      state.carts = action.payload; // تنظیم کل آیتم‌های سبد خرید
    },
    // increase: (state, action) => {
    //   const item = state.carts.find((i) => i.id === action.payload);
    //   if (item) item.quantity += 1;
    // },
    // decrease: (state, action) => {
    //   const item = state.carts.find((i) => i.id === action.payload);
    //   if (item) {
    //     if (item.quantity === 1) {
    //       // اگر تعداد ۱ باشد، محصول را حذف کنید
    //       state.carts = state.carts.filter((i) => i.id !== action.payload);
    //     } else {
    //       // در غیر این صورت، یک واحد کم کنید
    //       item.quantity -= 1;
    //     }
    //   }
    // },
  },
});

/**شمارنده محصولات */
const counterSlice = createSlice({
  name: "counter",
  initialState: {}, // حالت اولیه به صورت یک شیء خالی (هر محصول با id خود ذخیره می‌شود)
  reducers: {
    increase: (state, action) => {
      const id = action.payload;
      state[id] = (state[id] || 0) + 1; // افزایش تعداد برای محصول با id مشخص
    },
    decrease: (state, action) => {
      const id = action.payload;
      if (state[id] > 0) {
        state[id] -= 1; // کاهش تعداد، اما نباید کمتر از صفر شود
      }
    },
  },
});
/**sliceبرای سرج */
const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "", // کوئری جستجو
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.query = action.payload; // به‌روزرسانی کوئری جستجو
    },
  },
});
/**برای احراز هویت */
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    phoneNumber: "",
    otpToken: null,
  },
  reducers: {
    setPhoneNumber(state, action) {
      state.phoneNumber = action.payload;
    },
    setOtpToken(state, action) {
      state.otpToken = action.payload;
    },
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.phoneNumber = "";
      state.otpToken = null;
    },
  },
});
/** ایجاد Store */
const store = configureStore({
  reducer: {
    pagination: paginationSlice.reducer,
    products: productsSlice.reducer,
    search: searchSlice.reducer,
    counter: counterSlice.reducer,
    cart: cartSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default store;

/** اکشن‌های پیجینیشن */
export const { setCurrentPage, nextPage, prevPage, jumpToPage } =
  paginationSlice.actions;

/** اکشن‌های محصولات */
export const { setProducts, deleteProduct, updateProduct, addProduct } =
  productsSlice.actions;

/*اکشن سرچ* */
export const { setSearchQuery } = searchSlice.actions;

/*سبد خرید */
export const { addToCart, deleteProductCart, increase, decrease } =
  cartSlice.actions;
/**احراز هویت */
// export const { setPhoneNumber, setOtpToken, login, logout } = authSlice.actions;
export const setPhoneNumber = (phoneNumber) => ({
  type: "auth/setPhoneNumber",
  payload: phoneNumber,
});

export const setOtpToken = (otpToken) => ({
  type: "auth/setOtpToken",
  payload: otpToken,
});

export const login = () => ({
  type: "auth/login",
});

export const logout = () => ({
  type: "auth/logout",
});
/** بازیابی اطلاعات پیجینیشن از localStorage */
const savedPage = localStorage.getItem("currentPage");
if (savedPage) {
  const currentPage = Number(savedPage); // تبدیل به عدد
  if (!isNaN(currentPage)) {
    store.dispatch(setCurrentPage(currentPage)); // تنظیم صفحه فعلی
  }
}

/** بازیابی اطلاعات محصولات از localStorage */
const savedProducts = localStorage.getItem("products");
if (savedProducts) {
  const products = JSON.parse(savedProducts); // تبدیل به آرایه
  store.dispatch(setProducts(products)); // تنظیم محصولات
}

/** بازیابی اطلاعات سبد خرید از localStorage */
const savedCart = localStorage.getItem("carts");
if (savedCart) {
  try {
    const carts = JSON.parse(savedCart);
    if (Array.isArray(carts)) {
      store.dispatch(cartSlice.actions.setCarts(carts)); // تنظیم داده‌های معتبر
    } else {
      console.error("Invalid cart data in localStorage:", savedCart);
      localStorage.removeItem("carts"); // پاک کردن داده‌های نامعتبر
      //داده ای به صورت دیفالت در لیست سفارششات وجود نخواهد داشت
    }
  } catch (error) {
    console.error("Error parsing cart data from localStorage:", error);
    localStorage.removeItem("carts"); // پاک کردن داده‌های نامعتبر
  }
}
/** به‌روزرسانی localStorage هنگام تغییر وضعیت */
store.subscribe(() => {
  const state = store.getState();

  // ذخیره صفحه فعلی paginations
  const currentPage = state.pagination.currentPage;
  localStorage.setItem("currentPage", currentPage.toString());

  // ذخیره محصولات
  const products = state.products.products;
  localStorage.setItem("products", JSON.stringify(products));

  // ذخیره سبد خرید
  const carts = state.cart.carts;
  localStorage.setItem("carts", JSON.stringify(carts));
});
