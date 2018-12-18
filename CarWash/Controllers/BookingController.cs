using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using CarWash.Models;
using CarWash.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CarWash.Controllers
{
    [Route("api/Booking")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private IBookingService bs;
        private ITimeManagementService tms;

        public BookingController(IBookingService bs, ITimeManagementService tms)
        {
            this.bs = bs;
            this.tms = tms;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]PostOrderConfirmation body)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    if (body.Confirm)
                    {
                        await bs.MakeOrder(body.Name, body.Phone, body.TimeslotId);
                    }
                    else
                    {
                        await tms.RollbackPreOrder(body.TimeslotId, body.ChangedSlotIds);
                    }
                    return Ok();
                }
                catch (Exception ex)
                {
                    Debug.WriteLine(ex.Message);
                    return BadRequest(ex);
                }
            }
            return BadRequest(ModelState);
        }
    }
}