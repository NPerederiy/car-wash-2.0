using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CarWash.Models;
using CarWash.Models.Interfaces;

namespace CarWash.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceListController : ControllerBase
    {
        private readonly IRepository<WashService> washServices;

        public ServiceListController(CarWashDBContext context)
        {
            washServices = new Repository<WashService>(context);
        }

        // GET: api/ServiceList
        [HttpGet]
        public async Task<IActionResult> GetWashServicesAsync()
        {
            var washService = await washServices.GetAllAsync();

            if (washService == null)
            {
                return NotFound();
            }

            return Ok(washService);
        }

        // GET: api/ServiceList/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetWashServiceByIdAsync([FromRoute] int id)
        {
            var washService = await washServices.GetByConditionAsync(x => x.ServiceId.Equals(id));

            if (washService == null)
            {
                return NotFound();
            }

            return Ok(washService);
        }
    }
}