using Exodus.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.Exceptions
{
    public class TagNotFoundException : ExodusException
    {
        public override string Header { get; set; } = typeof(TagNotFoundException).Name.Replace("Exception", "");
        public override EN_ErrorCodes ErrorCode { get; set; } = EN_ErrorCodes.TagNotFound;
        public override string ErrorPath { get { return $"/{Global.Global.Language}/Errors/TagNotFound"; } }
        public override string Message
        {
            get { return _Message; }
        }
        private string _Message = "Tag not found";

        public TagNotFoundException(params long[] TagID)
        {
            _Message = $"Tag with ID {string.Join(";", TagID)} not found";
        }

        public TagNotFoundException() : base("Tag not found")
        {

        }

        public TagNotFoundException(string message)
            : base(message)
        {
            _Message = message;
        }

        public TagNotFoundException(string message, Exception inner)
            : base(message, inner)
        {
            _Message = message;
        }
    }
}