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
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private IBookingService bs;

        public BookingController(IBookingService bs)
        {
            this.bs = bs;
        }

        [HttpPost]
        public IActionResult Post([FromBody]PostSubmit body)
        {
            if (ModelState.IsValid)
            {
                try
                {
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