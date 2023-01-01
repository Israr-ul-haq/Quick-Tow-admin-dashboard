import Swal from "sweetalert2"

const deleteItem = async (id, data, service, title, setLoader, removeItem) => {
  Swal.fire({
    title: "Are you sure, you want to delete " + title + "?",
    showCancelButton: true,
    confirmButtonText: `Delete`,
    showCloseButton: true,
    closeButtonHtml: '<img src="./img/Icon material-cancel.png" alt="crossicon" className="popupcrossimage"/>',
    reverseButtons: true,
  }).then(async (result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      setLoader(true)
      let removeIndex = data
<<<<<<< HEAD
      .map((item) => {
        if(title === "Company"){
        return item.companyId
        }else if(title === "Trucker") {
          return item.id
        }
      })
        .indexOf(id)
      data.splice(removeIndex, 1)
      const response = await service.delete(id)
      if (response.data.code === 1) {
=======

        .map((item) => {
          if (removeItem === "User") {
            return item.UserId
          } else if (title === "Feature") {
            return item.FeatureId
          } else if (title === "Booking") {
            return item.BookingId
          } else if (title === "Event") {
            return item.EventId
          } else if (title === "Ad") {
            return item.Id
          } else if (title === "Subscription") {
            return item.SubscriptionId
          } else if (title === "Query") {
            return item.QueryId
          } else if (title === "Voucher") {
            return item.VoucherId
          }
        })
        .indexOf(id)
      data.splice(removeIndex, 1)
      debugger
      const response = await service.delete(id, JSON.parse(localStorage.getItem("makhtabquserId")))
      debugger
      if (response.data.Code === 1) {
>>>>>>> eee0ccdd2a409cadaca5930e069292f9036fe73e
        Swal.fire({
          icon: "success",
          title: "Success",
          text: title + " deleted!",
        })
        // const response = await service.delete(id)
        setLoader(false)
      }

      if (response.data.code === 0) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        })
        setLoader(false)
      }
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info")
      setLoader(false)
    }
  })
}

export default deleteItem
