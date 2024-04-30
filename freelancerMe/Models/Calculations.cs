using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FreelancerMe.Models;

public partial class Calculations
{
    
    [Display(Name = "First Number")]
    public int FirstNumber {  get; set; }

    
    public string PageName { get; set; }

    
    [Display(Name = "Second Number")]
    public int SecondNumber { get; set; }
    public int Result { get; set; } 
}
