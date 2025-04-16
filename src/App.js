
import "./App.css";
import { useState,useCallback} from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
/** Components Admin */
import Sidbar_PanelAdmin from "./components/PanelAdmin/sidbar";
import Navigation_PanelAdmin from "./components/PanelAdmin/navigation";
import Dashbord from "./components/PanelAdmin/dashbord";
import UserLists_PanelAdmin from "./components/PanelAdmin/usersList";
import OrderLists_PanelAdmin from "./components/PanelAdmin/orderList";
import Categories_PanelAdmin from "./components/PanelAdmin/categories";
import Profile_PanelAdmin from "./components/PanelAdmin/profile";
import Notifications_PanelAdmin from './components/PanelAdmin/notification';
import Breakfast_ProductsAdmin from "./components/PanelAdmin/breakfast_productsAdmin";
import EsprssoBar_productsAdmin from "./components/PanelAdmin/espressoBar_productsAdmin";
/** Components Home */
import Home from "./components/Home/home";
import Navigation_Home from "./components/Home/navigation_Home";
import ListOreder_Home from "./components/Home/listOreder_Home";
import Sidbar_Home from "./components/Home/sidbar_Home";
import Breakfast_ProductsHome from "./components/Home/breakfast";
import Suggestion_ProductsHome from "./components/Home/suggestion";
import Appetizer_ProductsHome from "./components/Home/appetizer";
import Salad_ProductsHome from "./components/Home/salad";
import IranianFood_ProductsHome from "./components/Home/iranianFood";
import WesternFood_ProductsHome from "./components/Home/westernFood";
import EspressoBar_ProductsHome from './components/Home/espressoBar';
import Tea_ProductsHome from "./components/Home/tea";
import Shake_ProductsHome from "./components/Home/shake";
import IceCoffee_ProductsHome from "./components/Home/ice-coffee";
import Juice_ProductsHome from "./components/Home/juice";
import SocialMedia from "./components/Home/socialMedia";
import Login from "./components/verify/login";
import Gallery from './components/Home/Gallery';
/** Redux */
import { Provider } from "react-redux";
import store from "./stor/store";
import bg_Image from './images/restaurants-terrace-with-black-green-awnings_157027-4389.jpg'; 
import DetailsProducts from "./components/Home/detailsProducts";

function App() {
  const [activeComponent, setActiveComponent] = useState("dashboard"); // کامپوننت فعال
  const [activeCategoryComponent, setActiveCategoryComponent] = useState(null);
  const [activeComponent_SidbarHom, setActiveComponent__SidbarHom] = useState("breakfast");
  const [showSidbar, setShowSidbar] = useState(true); // نمایش یا عدم نمایش سایدبار پنل ادمین
  const [isCollapsed, setIsCollapsed] = useState(false); // وضعیت فشرده بودن سایدبار  
  const [showMenuBar, setShowMenuBar] = useState(false);
  const [showModalDetailsProducts, setShowModalDetailsProducts] = useState(false);
  const [showModalLogin, setShowModalLogin] = useState(false);
  const categoryComponentMap = {
    "2cf9dd98-28d2-480a-8805-588b41f05fdb": Breakfast_ProductsAdmin, // ID عددی دسته‌بندی صبحانه
    //idاش رو باید تغییر بدی
    "2cf9dd98-28d2-480a-8805-588b41f05fdb": EsprssoBar_productsAdmin,
  };
  //برگشت از ایتم های دسته بندی به کامپوننت دسته بندی
  const handleBack = () => {
    setActiveCategoryComponent(null); // غیرفعال کردن نمایش کامپوننت دسته‌بندی
    setActiveComponent("categories"); // فعال کردن حالت دسته‌بندی
  };
  
// کامپوننت داینامیک برای نمایش صفحات مختلف
const DynamicCategoryComponent = ({ categoryId }) => {
  const Component = categoryComponentMap[categoryId] || (() => <div className="text-white text-center">دسته‌بندی نامعتبر</div>);
  return <Component 
  categoryId={categoryId} 
  truncateText={truncateText}
  onBack={handleBack} 
  />;
};
  const handleshowModalLogin = () => {
    setShowModalLogin(!showModalLogin);
  };
  // تابع برای باز و بسته کردن مودال
  const handleshowDetailsProducts = () => {
    setShowModalDetailsProducts(!showModalDetailsProducts);
  };
 
  const handleShowMenuBar = () => {
    setShowMenuBar(!showMenuBar);
  };
  /* نمایش محدود کلمات عنوان و توضیحات */
  const truncateText = useCallback((text, wordLimit) => {
    if (typeof text !== 'string') return ""; 
    const words = text.split(" ");
    return words.length <= wordLimit ? text : words.slice(0, wordLimit).join(" ") + "...";
  }, []);
  

  return (
    <Provider store={store}>
      <Router>
        <div className="App fixed top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat">
          {/* Home Page */}
          <Routes>
            {/* صفحه اصلی */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            {/* صفحه محصولات */}
            <Route
              path="/main"
              element={
                <div className="h-screen overflow-y-auto flex flex-col bg-cover bg-center bg-no-repeat scroll"style={{
                  backgroundImage: `url(${bg_Image})`,                
                }}>
                  {/* Navigation Bar */}
                  <Navigation_Home  handleShowMenuBar={handleShowMenuBar} handleshowModalLogin={handleshowModalLogin}/>
                  <ListOreder_Home showMenuBar={showMenuBar} handleShowMenuBar={handleShowMenuBar} truncateText={truncateText} />
                  <Login showModalLogin={showModalLogin} handleshowModalLogin={handleshowModalLogin} />
                  {/* Sidebar and Content */}
                  <div className="flex flex-row flex-grow">
                    {/* Main Content */}
                    <div className="flex-grow overflow-y-auto">
                      <Breakfast_ProductsHome truncateText={truncateText} handleshowDetailsProducts={handleshowDetailsProducts} />
                      <Suggestion_ProductsHome truncateText={truncateText} handleshowDetailsProducts={handleshowDetailsProducts} />
                      <Appetizer_ProductsHome truncateText={truncateText} handleshowDetailsProducts={handleshowDetailsProducts} />
                      <Salad_ProductsHome truncateText={truncateText} handleshowDetailsProducts={handleshowDetailsProducts} />
                      <IranianFood_ProductsHome truncateText={truncateText} handleshowDetailsProducts={handleshowDetailsProducts} />
                      <WesternFood_ProductsHome truncateText={truncateText} handleshowDetailsProducts={handleshowDetailsProducts} />
                      <EspressoBar_ProductsHome truncateText={truncateText} handleshowDetailsProducts={handleshowDetailsProducts} />
                      <Tea_ProductsHome truncateText={truncateText} handleshowDetailsProducts={handleshowDetailsProducts} />
                      <Shake_ProductsHome truncateText={truncateText} handleshowDetailsProducts={handleshowDetailsProducts} />
                      <IceCoffee_ProductsHome truncateText={truncateText} handleshowDetailsProducts={handleshowDetailsProducts} />
                      <Juice_ProductsHome truncateText={truncateText} handleshowDetailsProducts={handleshowDetailsProducts} />
                      <DetailsProducts showModalDetailsProducts={showModalDetailsProducts} handleshowDetailsProducts={handleshowDetailsProducts} />
                      <SocialMedia />
                    </div>

                    {/* Sidebar */}
                    <div className="w-24 flex-shrink-0 h-screen overflow-y-auto scroll sticky top-0 bg-slate-800 bg-opacity-50 text-gray-300">
                      <Sidbar_Home
                        activeComponent_SidbarHom={activeComponent_SidbarHom}
                        setActiveComponent__SidbarHom={setActiveComponent__SidbarHom}
                      />
                    </div>

                  </div>
                </div>
              }
            />

            {/* Admin Panel */}
            <Route
              path="/panelAdmin"
              element={
                <div className=" h-screen flex overflow-y-auto   scroll bg-slate-900 ">
                  <div className="overflow-y-auto overflow-x-hidden    scroll  ">
                    <Sidbar_PanelAdmin
                      activeComponent={activeComponent}
                      setActiveComponent={setActiveComponent}
                      showSidbar={showSidbar}
                      isCollapsed={isCollapsed}
                    />
                  </div>
                  <div className="flex-grow overflow-y-auto scroll">
                  <Navigation_PanelAdmin setIsCollapsed={setIsCollapsed} isCollapsed={isCollapsed} />
                {activeCategoryComponent && (
                <DynamicCategoryComponent 
                  categoryId={activeCategoryComponent}
                  truncateText={truncateText}
                  onBack={handleBack}
                  isCollapsed={isCollapsed}
                 />
                )}
             {!activeCategoryComponent && (
              <>
                {activeComponent === "dashboard" && <Dashbord />}
                {activeComponent === "users" && <UserLists_PanelAdmin />}
                {activeComponent === "orderList" && <OrderLists_PanelAdmin />}
                {activeComponent === "profileAdmin" && <Profile_PanelAdmin />}
                {activeComponent === "notifications" && <Notifications_PanelAdmin />}
                {activeComponent === "categories" && (
                  <Categories_PanelAdmin
                    setActiveComponent={setActiveComponent}
                    setActiveCategoryComponent={setActiveCategoryComponent}
                    truncateText={truncateText}
                  />
                )}
              </>
            )}
                  </div>
                </div>
              }
            />
            
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;