using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CarWash.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        [HttpPost]
        public IActionResult Post([FromBody]bool confirm)
        {
            if (ModelState.IsValid)
            {
                // some action
                return Ok();
            }
            return BadRequest(ModelState);
        }
    }
}