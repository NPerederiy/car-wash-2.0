using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarWash.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
//using System.Web.Http.Cors;

namespace CarWash.Controllers
{
    [Route("api/Time")]
    [ApiController]
    public class TimeController : ControllerBase
    {
        [HttpPost]
        public IActionResult Post(/*[FromBody]WashService[] washServices*/)
        {
            if (ModelState.IsValid)
            {
                return Ok(new string[] { "16:00" });
            }
            return BadRequest(ModelState);
        }

        [HttpGet]
        public IActionResult GetTime()
        {
            return Ok("17:00");
        }

        //public IActionResult Post([FromBody]WashService[] washServices)
        //{
        //    //if (user != null)
        //    //    user.Age += 10;

        //    return new JsonResult("16:00");
        //    //Json(user,
        //    //    new JsonSerializerSettings
        //    //    {
        //    //        ContractResolver = new CamelCasePropertyNamesContractResolver()
        //    //    });
        //}
    }
}