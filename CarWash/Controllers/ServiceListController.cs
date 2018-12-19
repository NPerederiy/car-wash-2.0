using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CarWash.Models;
using CarWash.Models.Interfaces;
using CarWash.Services.Interfaces;

namespace CarWash.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceListController : ControllerBase
    {
        private IWashOptionService wos;

        public ServiceListController(IWashOptionService wos)
        {
            this.wos = wos;
        }

        // GET: api/ServiceList
        [HttpGet]
        public async Task<IActionResult> GetWashServicesAsync()
        {
            var washOptions = await wos.GetWashServicesAsync();

            if (washOptions == null)
            {
                return NotFound();
            }

            return Ok(washOptions);
        }

        // GET: api/ServiceList/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetWashServiceByIdAsync([FromRoute] int id)
        {
            var washOption = await wos.GetWashServiceByIdAsync(id);

            if (washOption == null)
            {
                return NotFound();
            }

            return Ok(washOption);
        }
    }
}