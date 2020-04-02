using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.Enums
{
    // DB dbo.EventTypes
    public enum EN_EventType
    {
        Tag_Join_Invitation = 1, //
        User_Has_Joined_Tag_Upon_Your_Invitation = 2, //
        User_Has_Left_Tag = 3,
        User_Was_Removed_From_Tag_By_System = 4,
        New_Transaction_Received_Confirmation_Required = 5, //
        Transaction_Was_Confirmed_By_Receiver = 6, //
        User_Status_Became_Red = 7, // 
        User_Status_Became_Green = 8, //
        User_Status_Became_Yellow = 9, //
        Obligation_Execution_Requested = 10, //
        Intention_To_Obligation_Convertion_Requested = 11, //
        User_Reported_Key_Tag_Related_Event = 12,
        Own_Initiative_Tag_Reached_Target_Amount_Including_Intentions = 13,
        Own_Initiative_Tag_Reached_Target_Amount = 14
    }

    // DB dbo.EventCategories
    public enum EN_EventCategory
    {
        Tag = 1,
        Transaction = 2,
        User_Status = 3,
        Intention = 4,
        Obligation = 5
    }

    // Важные и сверхважные событие не игнорируются
    // DB dbo.ImportanceLevels
    public enum EN_ImportantLevel
    {
        None = 1,   // Неважно
        Low = 2,    // Низкая важность
        Medium = 3, // Средняя
        High = 4,   // Важно
        Urgent = 5  // Сверхважно
    }

    public enum EN_KeyType
    {
        None = 0,
        Number = 1,
        Text = 2,
        Money = 3,
        DateTime = 4
    }

    public enum EN_ModelType
    {
        Field = 0,
        Class = 1,
        ClassField = 2
    }

    public enum EN_RelationType
    {
        None = 0,
        User = 1,
        Tag = 2
    }

    public enum EN_SubType
    {
        Content,
        Thumbnail,
        Related
    }
}