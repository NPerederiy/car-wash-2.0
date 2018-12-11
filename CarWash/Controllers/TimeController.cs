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
        public async Task<IActionResult> Post([FromBody]PostSelectedOptionsAndTime body)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var tms = new TimeManagementService(context);
                    var response = await tms.GetProposedTime(body.SelectedWashServices, body.TimeFrom, body.TimeTo);
                    return Ok(response);
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