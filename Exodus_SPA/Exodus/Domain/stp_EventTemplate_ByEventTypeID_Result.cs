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
    
    public partial class stp_EventTemplate_ByEventTypeID_Result
    {
        public long EventTemplateID { get; set; }
        public long fk_EventTypeID { get; set; }
        public string EventTitleRus { get; set; }
        public string EventTitleEng { get; set; }
        public string EventContent { get; set; }
        public string EventThumbnail { get; set; }
    }
}