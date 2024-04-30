using FreelancerMe.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Diagnostics;
using System.Runtime.CompilerServices;
using System.Text.Json;

namespace FreelancerMe.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Page1()
        {
            Calculations calculations = new Calculations();

            return View(calculations);
        }
        [HttpPost]
        public IActionResult Page1(Calculations calculations)
        {
            if (ModelState.IsValid)
            {
                var listCalculation = HttpContext.Session.Get<List<Calculations>>("calList");

                if (listCalculation == null)
                {
                    var lst = new List<Calculations>();
                    lst.Add(calculations);
                    HttpContext.Session.Set<List<Calculations>>("calList", lst);
                }
                else
                {
                    var calForThisPage= listCalculation.FirstOrDefault(x => x.PageName == @Util.Var.Page1);
                    if (calForThisPage == null)
                    {
                        listCalculation.Add(calculations);
                    }
                    else
                    {
                        calForThisPage.FirstNumber = calculations.FirstNumber;
                        calForThisPage.SecondNumber = calculations.SecondNumber;
                    }
                    HttpContext.Session.Set<List<Calculations>>("calList", listCalculation);

                }
                TempData["success"] = "Numbers stored in session and can be viewed on the 3rd page";
            }
            else
                TempData["error"] = "Please ensure all validations done.";

            return View(calculations);
        }
        [HttpPost]
        public IActionResult Page2(Calculations calculations)
        {
            if (ModelState.IsValid)
            {
                var listCalculation = HttpContext.Session.Get<List<Calculations>>("calList");

                if (listCalculation == null)
                {
                    var lst = new List<Calculations>();
                    lst.Add(calculations);
                    HttpContext.Session.Set<List<Calculations>>("calList", lst);
                }
                else
                {
                    var calForThisPage = listCalculation.FirstOrDefault(x => x.PageName == @Util.Var.Page2);
                    if (calForThisPage == null)
                    {
                        listCalculation.Add(calculations);
                    }
                    else
                    {
                        calForThisPage.FirstNumber = calculations.FirstNumber;
                        calForThisPage.SecondNumber = calculations.SecondNumber;
                    }
                    HttpContext.Session.Set<List<Calculations>>("calList", listCalculation);

                }
                TempData["success"] = "Numbers stored in session and can be viewed on the 3rd page";
            }
            else
                TempData["error"] = "Please ensure all validations done.";

            return View(calculations);
        }
        public IActionResult Page2()
        {
            Calculations calculations = new Calculations();

            return View(calculations);
        }
        public IActionResult Page3()
        {
            var listCalculation = HttpContext.Session.Get<List<Calculations>>("calList");
            if (listCalculation == null)
            {
                listCalculation = new List<Calculations>();
            }

            return View(listCalculation);
        }

        
    }
    public static class SessionExtensions
    {
        public static void Set<T>(this ISession session, string key, T value)
        {
            session.SetString(key, JsonSerializer.Serialize(value));
        }

        public static T Get<T>(this ISession session, string key)
        {
            var value = session.GetString(key);
            return value == null ? default : JsonSerializer.Deserialize<T>(value);
        }
    }
}
