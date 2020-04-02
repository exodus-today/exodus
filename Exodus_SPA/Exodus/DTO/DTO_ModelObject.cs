using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.DTO
{
    public class DTO_ModelObject
    {
        public DTO_ModelObject(string Name, object Model)
        {
            this.Name = Name;
            this.Model = Model;
        }
        public string Name { get; set; }
        public object Model { get; set; }
        public Type Type { get { return Model.GetType(); } }
    }
}