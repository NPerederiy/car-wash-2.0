using CarWash.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Linq;

namespace CarWash.Filters
{
    public class ValidatePostOrderConfirmationAttribute : IActionFilter
    {
        public void OnActionExecuting(ActionExecutingContext context)
        {
            var param = context.ActionArguments.SingleOrDefault(p => p.Value is PostOrderConfirmation);
            var body = param.Value as PostOrderConfirmation;

            if (body == null)
            {
                context.Result = new BadRequestObjectResult("Request body is null");
            }
            /**/
            if (body.Confirm)
            {
                if(body.Name == null)
                {
                    context.Result = new BadRequestObjectResult("Name was not received");
                }
                if (body.Phone == null)
                {
                    context.Result = new BadRequestObjectResult("Phone was not received");
                }
            }
            /**/
            if (body.TimeslotId < 1)
            {
                context.Result = new BadRequestObjectResult("Index out of range exception");
            }
            if (body.ChangedSlotIds.Length == 0 || body.ChangedSlotIds == null)
            {
                context.Result = new BadRequestObjectResult("Slot identifiers were not received");
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
