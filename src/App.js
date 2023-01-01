<<<<<<< HEAD
import { Switch, Route, HashRouter,  } from "react-router-dom"
=======
import { Switch, Route, HashRouter } from "react-router-dom"

>>>>>>> eee0ccdd2a409cadaca5930e069292f9036fe73e
import PrivateRoute from "./components/Common/PrivateRoute"
import Login from "./components/Account/Login/Login"
import AuthLayout from "./layouts/AuthLayout"
import WebLayout from "./layouts/WebLayout"
import Register from "./components/Account/Register/Register"
import Dashboard from "./components/Dashboard/Dashboard"

import "jquery/dist/jquery.min.js"
//Datatable Modules
import "datatables.net/js/jquery.dataTables.min.js"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import "datatables.net-buttons/js/buttons.colVis"
import "datatables.net-buttons/js/buttons.html5"
import "datatables.net-buttons/js/buttons.flash"
import "datatables.net-buttons/js/buttons.print"



import UserManagement from "./components/ManageUser/ManageUser"
import EditUser from "./components/ManageUser/EditUser"
import ViewUser from "./components/ManageUser/ViewUser"
import TruckManagement from "./components/Truckers/ManageTruckers"
import AddNewTruck from "./components/Truckers/AddNewTrucker"
import EditTruck from "./components/Truckers/EditTruck"
import ViewTrucker from "./components/Truckers/ViewTrucker"
import ManageCompany from "./components/Company/ManageCompany"
import AddCompany from "./components/Company/AddCompany"
import EditCompany from "./components/Company/EditCompany"
import ViewCompanyProfile from "./components/Company/ViewCompanyProfile"
import ManageServices from "./components/Services/ManageServices"
import AddNewService from "./components/Services/AddNewService"
import EditService from "./components/Services/EditService"
import ViewService from "./components/Services/ViewService"
import ManageHistory from "./components/History/ManageHistory"
import ViewHistory from "./components/History/ViewHistory"
import ViewNotifications from "./components/Notifications/ViewNotifications"
import ManageQueries from "./components/Query/ManageQueries"
import QueryReply from "./components/Query/QueryReply"
import CompanyTruckManagement from "./components/Company/ManageCompanyDrivers"
import AddCompanyDriver from "./components/Company/AddCompanyDriver"
import EditCompanyDriver from "./components/Company/EditCompanyDriver"
import ViewCompanyDriver from "./components/Company/ViewCompanyDriver"
import Profile from "./components/Profile/Profile"
<<<<<<< HEAD
import EditProfile from "./components/Profile/EditProfile"



=======
import ViewFeature from "./components/Features/ViewFeature"
import ViewSubscription from "./components/Subscription/ViewSubscription"
import AddNewSubscription from "./components/Subscription/AddNewSubscription"
import ManageCategory from "./components/Category/ManageCategory"
import AddNewCategory from "./components/Category/AddNewCategory"
import EditCategory from "./components/Category/EditCategory"
import ViewCategory from "./components/Category/ViewCategory"
import AddNewSlot from "./components/Slots/AddNewSlot"
import ManageSlots from "./components/Slots/ManageSlots"
import ManageBooking from "./components/Booking/ManageBooking"
import EditSlot from "./components/Slots/EditSlot"
import AddNewBooking from "./components/Booking/AddNewBooking"
import EditBooking from "./components/Booking/EditBooking"
import ViewBooking from "./components/Booking/ViewBooking.js"
import ViewSlots from "./components/Slots/ViewSlots"
import ManageCheckIn from "./components/CheckIn/ManageCheckIn"
import ManageAds from "./components/Ads/ManageAds"
import AddNewAd from "./components/Ads/AddNewAds"
import EditAds from "./components/Ads/EditAds"
import ManageQueries from "./components/Query/ManageQueries"
import QueryReply from "./components/Query/QueryReply"
import EditProfile from "./components/Profile/EditProfile"
import ScrollFromTop from "./shared/ScrollFromTop"
import ChatRoom from "./components/Query/ChatRoom"
>>>>>>> eee0ccdd2a409cadaca5930e069292f9036fe73e

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/account/:path?">
          <AuthLayout>
            <Switch>
              <Route path={"/account/login"} exact component={Login} />
              <Route path={"/account/register"} component={Register} />
            </Switch>
          </AuthLayout>
        </Route>
        {/* <Route> */}
        <Route>
          <WebLayout>
            <Switch>
<<<<<<< HEAD
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/UserManagement" component={UserManagement} />
              <PrivateRoute path="/EditUser/:id" component={EditUser} />
              <PrivateRoute path="/ViewUser/:id/:userStatus" component={ViewUser} />
              <PrivateRoute path="/TruckManagement" component={TruckManagement} />
              <PrivateRoute path="/AddNewTruck" component={AddNewTruck} />
              <PrivateRoute path="/EditTruck/:id" component={EditTruck} />
              <PrivateRoute path="/ViewTrucker" component={ViewTrucker} />
              <PrivateRoute path="/ManageCompany/" component={ManageCompany} />
              <PrivateRoute path="/AddCompany" component={AddCompany} />
              <PrivateRoute path="/EditCompany/:userId" component={EditCompany} />
              <PrivateRoute path="/ViewCompanyProfile/:userId" component={ViewCompanyProfile} />
              <PrivateRoute path="/ManageServices" component={ManageServices} />
              <PrivateRoute path="/AddNewService" component={AddNewService} />
              <PrivateRoute path="/EditService" component={EditService} />
              <PrivateRoute path="/ViewService" component={ViewService} />
              <PrivateRoute path="/ManageHistory" component={ManageHistory} />
              <PrivateRoute path="/ViewHistory" component={ViewHistory} />
              <PrivateRoute path="/ViewNotifications" component={ViewNotifications}  />
              <PrivateRoute path="/ManageQueries" component={ManageQueries} />
              <PrivateRoute path="/QueryReply" component={QueryReply} /> 
              <PrivateRoute path="/ManageCompanyDrivers" component={CompanyTruckManagement}/> 
              <PrivateRoute path="/AddCompanyDriver" component={AddCompanyDriver}/> 
              <PrivateRoute path="/EditCompanyDriver" component={EditCompanyDriver}/> 
              <PrivateRoute path="/ViewCompanyDriver" component={ViewCompanyDriver}/> 
              <PrivateRoute path="/Profile" component={Profile}/> 
              <PrivateRoute path="/EditProfile" component={EditProfile}/> 
=======
              <ScrollFromTop>
                <PrivateRoute exact path="/" component={Dashboard} />
                <PrivateRoute path="/Profile" component={Profile} />
                <PrivateRoute path="/Features" component={Features} />
                <PrivateRoute path="/FeaturesAdd" component={FeaturesAdd} />
                <PrivateRoute path="/ManageVerifications" component={ManageVerifications} />
                <PrivateRoute path="/ViewProfileBusiness/:UserId" component={ViewProfileBusiness} />
                {/* <PrivateRoute path="/ManageOffers" component={ManageOffers} /> */}
                <PrivateRoute path="/AddNewOffer" component={AddNewOffer} />
                <PrivateRoute path="/ViewOffer/:OfferId" component={ViewOffer} />
                <PrivateRoute path="/EditOffers/:OfferId" component={EditOffers} />
                <PrivateRoute path="/ManageEvent" component={ManageEvent} />
                <PrivateRoute path="/AddNewEvent" component={AddNewEvent} />
                <PrivateRoute path="/EditEvent/:EventId" component={EditEvent} />
                <PrivateRoute path="/ViewEvent/:EventId" component={ViewEvent} />
                <PrivateRoute path="/ManageSubscription" component={ManageSubscription} />
                <PrivateRoute path="/ViewSubscription/:SubscriptionId" component={ViewSubscription} />
                <PrivateRoute path="/AddNewSubscription" component={AddNewSubscription} />
                <PrivateRoute path="/EditSubscription/:SubscriptionId" component={EditSubscription} />
                <PrivateRoute path="/Finance" component={Finance} />
                <PrivateRoute path="/ManageVoucher" component={ManageVoucher} />
                <PrivateRoute path="/AddNewVoucher" component={AddNewVoucher} />
                <PrivateRoute path="/ViewVoucherDetail/:VoucherId" component={ViewVoucherDetail} />
                <PrivateRoute path="/EditVoucher/:VoucherId" component={EditVoucher} />
                <PrivateRoute path="/ManageReport" component={ManageReport} />
                <PrivateRoute path="/ManageSubAdmin" component={ManageSubAdmin} />
                <PrivateRoute path="/AddNewSubAdmin" component={AddNewSubAdmin} />
                <PrivateRoute path="/ViewSubAdmin/:UserId" component={ViewSubAdmin} />
                <PrivateRoute path="/EditSubAdmin/:UserId" component={EditSubAdmin} />
                <PrivateRoute path="/ManageCSP" component={ManageCSP} />
                <PrivateRoute path="/AddNewCSP" component={AddNewCSP} />
                <PrivateRoute path="/ViewCSP/:UserId" component={ViewCSP} />
                <PrivateRoute path="/EditCSP/:UserId" component={EditCSP} />
                <PrivateRoute path="/ManageBusinessOwner" component={ManageBusinessOwner} />

                <PrivateRoute path="/AddNewBusinessOwner" component={AddNewBusinessOwner} />

                <PrivateRoute path="/EditBusinessOwner/:UserId" component={EditBusinessOwner} />
                <PrivateRoute path="/ViewBusinessOwner/:UserId" component={ViewBusinessOwner} />
                <PrivateRoute path="/ManageUser" component={ManageUser} />
                <PrivateRoute path="/AddNewUser" component={AddNewUser} />
                <PrivateRoute path="/EditUser/:UserId" component={EditUser} />
                <PrivateRoute path="/ViewUser/:UserId" component={ViewUser} />
                <PrivateRoute path="/EditFeature/:FeatureId" component={EditFeature} />
                <PrivateRoute path="/ViewFeature/:FeatureId" component={ViewFeature} />
                <PrivateRoute path="/ManageCategory" component={ManageCategory} />
                <PrivateRoute path="/AddNewCategory" component={AddNewCategory} />
                <PrivateRoute path="/EditCategory/:CategoryId" component={EditCategory} />
                <PrivateRoute path="/ViewCategory/:CategoryId" component={ViewCategory} />
                <PrivateRoute path="/AddNewSlot/:BusinessId" component={AddNewSlot} />
                <PrivateRoute path="/ManageSlots" component={ManageSlots} />
                <PrivateRoute path="/ManageBooking" component={ManageBooking} />
                <PrivateRoute path="/AddNewBooking" component={AddNewBooking} />
                <PrivateRoute path="/EditSlot/:BusinessSlotId/:BusinessId" component={EditSlot} />
                <PrivateRoute path="/ViewSlots/:BusinessId" component={ViewSlots} />
                <PrivateRoute path="/EditBooking/:BookingId" component={EditBooking} />
                <PrivateRoute path="/ViewBooking/:BookingId/:Status" component={ViewBooking} />
                <PrivateRoute path="/ManageCheckIn" component={ManageCheckIn} />
                <PrivateRoute path="/ManageAds" component={ManageAds} />
                <PrivateRoute path="/AddNewAd" component={AddNewAd} />
                <PrivateRoute path="/EditAds/:Id" component={EditAds} />
                <PrivateRoute path="/ManageQueries" component={ManageQueries} />
                <PrivateRoute path="/QueryReply/:id" component={QueryReply} />
                <PrivateRoute path="/EditProfile" component={EditProfile} />
                <PrivateRoute path="/ChatRoom" component={ChatRoom} />
              </ScrollFromTop>
>>>>>>> eee0ccdd2a409cadaca5930e069292f9036fe73e
            </Switch>
          </WebLayout>
        </Route>
      </Switch>
    </HashRouter>
  )
}

export default App
