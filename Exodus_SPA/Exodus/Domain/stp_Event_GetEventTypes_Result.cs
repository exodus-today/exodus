//------------------------------------------------------------------------------
// <auto-generated>
//     Этот код создан по шаблону.
//
//     Изменения, вносимые в этот файл вручную, могут привести к непредвиденной работе приложения.
//     Изменения, вносимые в этот файл вручную, будут перезаписаны при повторном создании кода.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Exodus.Domain
{
    using System;
    
    public partial class stp_Event_GetEventTypes_Result
    {
        public long EventTypeID { get; set; }
        public int fk_EventCategoryID { get; set; }
        public int fk_ImportanceLevelID { get; set; }
        public string EventTypeNameEng { get; set; }
        public string EventTypeNameRus { get; set; }
        public string EventTypeComment { get; set; }
    }
}
