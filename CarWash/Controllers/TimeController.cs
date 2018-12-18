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
using CarWash.Services.Interfaces;
using CarWash.Models.Interfaces;
using Newtonsoft.Json;

namespace CarWash.Controllers
{
    [Route("api/Time")]
    [ApiController]
    public class TimeController : ControllerBase
    {
        private ITimeManagementService tms;

        public TimeController(ITimeManagementService tms)
        {
            this.tms = tms;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]PostSelectedOptionsAndTime body)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var(time, id, changedSlots)  = await tms.GetProposedTime(body.SelectedWashServices, body.TimeFrom, body.TimeTo);
                    return Ok(new { time, id, changedSlots });
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