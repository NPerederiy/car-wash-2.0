using CarWash.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Linq;

namespace CarWash.Filters
{
    public class ValidatePostSelectedOptionsAndTimeAttribute : IActionFilter
    {
        public void OnActionExecuting(ActionExecutingContext context)
        {
            var param = context.ActionArguments.SingleOrDefault(p => p.Value is PostSelectedOptionsAndTime);
            var body = param.Value as PostSelectedOptionsAndTime;

            if (body == null)
            {
                context.Result = new BadRequestObjectResult("Request body is null");
            }
            if (body.SelectedWashServices == null || body.SelectedWashServices.Length == 0)
            {
                context.Result = new BadRequestObjectResult("Selected options were not received");
            }
            if (body.TimeFrom == null || body.TimeFrom == "")
            {
                context.Result = new BadRequestObjectResult("'timeFrom' field was not received");
            }
            if (body.TimeTo == null || body.TimeTo == "")
            {
                context.Result = new BadRequestObjectResult("'timeTo' field was not received");
            }
            if (!context.ModelState.IsValid)
            {
                context.Result = new BadRequestObjectResult(context.ModelState);
            }
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {

        }
    }
}
