using Exodus.Enums;
using Exodus.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.View_InputModels
{
    public class VIM_Dispatcher
    {
        public VIM_Dispatcher() { }

        public VIM_Dispatcher(EN_ViewMenuItem menuItem, long itemID)
        {
            MenuItem = menuItem;
            ItemID = itemID;
        }

        public EN_ViewMenuItem MenuItem { get; set; } = EN_ViewMenuItem.MyIntentions;

        public long ItemID { get; set; } = -1;
    }
}