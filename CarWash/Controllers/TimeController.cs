using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarWash.Models;
using CarWash.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using Microsoft.EntityFrameworkCore;
//using System.Web.Http.Cors;

namespace CarWash.Controllers
{
    [Route("api/Time")]
    [ApiController]
    public class TimeController : ControllerBase
    {
        private readonly CarWashDBContext context;

        public TimeController(CarWashDBContext context)
        {
            this.context = context;
        }

        [HttpPost]
        public IActionResult Post([FromBody]PostSelectedOptionsAndTime body)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var tms = new TimeManagementService(context);
                    var response = tms.GetProposedTime(body.SelectedWashServices, body.TimeFrom, body.TimeTo);
                    return Ok(response.Result);
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