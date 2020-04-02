using Exodus.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.DTO
{
    public class UserStatusDTO
    {
        public string Message { get; set; } 
        public En_CurrentStatus Status { get; set; } 
        public En_Currency Emergency_Currency { get; set; } 
        public decimal Emergency_Sum { get; set; } 
        public En_Currency Regular_Currency { get; set; } 
        public decimal Regular_Sum { get; set; } 
        public En_HelpPeriods HelpPeriod { get; set; }
    }
}