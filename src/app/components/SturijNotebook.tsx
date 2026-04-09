import { useState, useRef, useCallback, useEffect } from "react";
import notebookCover from "figma:asset/d0a4869d5343fc1fe3e63084e5332011c9da648b.png";

// ─── HIDE SCROLLBARS — inject once ───────────────────────────────────────────
if (typeof document !== "undefined" && !document.getElementById("nb-no-scroll")) {
  const s = document.createElement("style");
  s.id = "nb-no-scroll";
  s.textContent = ".nb-scroll{scrollbar-width:none;-ms-overflow-style:none;}.nb-scroll::-webkit-scrollbar{display:none;}";
  document.head.appendChild(s);
}

// ─── DRAG-TO-SCROLL WRAPPER ───────────────────────────────────────────────────
function NbScroll({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref   = useRef<HTMLDivElement>(null);
  const state = useRef({ down: false, y: 0, top: 0, dragged: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      if (!state.current.down) return;
      const dy = e.clientY - state.current.y;
      if (!state.current.dragged && Math.abs(dy) > 4) {
        state.current.dragged = true;
        el.style.cursor = "grabbing";
      }
      if (state.current.dragged) el.scrollTop = state.current.top - dy;
    };

    const onUp = () => {
      state.current.down = false;
      el.style.cursor = "default";
      // tiny delay so click handlers can still check dragged before we reset it
      setTimeout(() => { state.current.dragged = false; }, 60);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup",   onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup",   onUp);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="nb-scroll"
      style={{ overflowY: "auto", cursor: "default", ...style }}
      onMouseDown={e => {
        if (e.button !== 0 || !ref.current) return;
        state.current = { down: true, y: e.clientY, top: ref.current.scrollTop, dragged: false };
      }}
      // swallow click if the gesture was actually a drag
      onClick={e => { if (state.current.dragged) { e.stopPropagation(); e.preventDefault(); } }}
    >
      {children}
    </div>
  );
}

// ─── TYPES ───────────────────────────────────────────────────────────────────
type IssueType = "Bug" | "Change" | "Question" | "New Feature" | "Action";
type Severity   = "Critical" | "High" | "Medium" | "Low";
type AIStatus   = "Idle" | "Processing" | "Ready for Review" | "Rejected";
type View       = "index" | "add" | "detail";

interface IssuePoint  { id: string; text: string; completed: boolean; }
interface AttachedFile { id: string; name: string; dataUrl: string; isImage: boolean; }
interface Issue {
  id: string; title: string; type: IssueType; severity: Severity;
  description: string; points: IssuePoint[]; notebook: string;
  dateAdded: Date; user: string; status: "Open" | "Ready for Review" | "Closed";
  aiStatus: AIStatus; aiMessage?: string; aiRating?: number; files: AttachedFile[];
}

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────

// Cover palette — only this changes in dark mode
const COVER = {
  light: { bg: "#8babd8", edge: "#6285b2", text: "#1a2744", shadow: "rgba(26,39,68,0.25)" },
  dark:  { bg: "#1b3464", edge: "#101f42", text: "#c8d8f0", shadow: "rgba(0,0,0,0.5)"  },
};

// Paper is ALWAYS cream, regardless of mode
const P = {
  bg:      "#fdfbf6",           // warm cream
  line:    "rgba(140,165,210,0.28)",  // ruled line colour
  margin:  "rgba(205,90,90,0.20)",   // red margin line
  ink:     "#2c2c3a",           // dark ink
  fade:    "#9090a8",           // faded ink / labels
  ghost:   "#c0c0cc",           // lightest / ghost text
  stamp:   "rgba(255,251,242,0.96)", // toolbar tint
};

const FONT  = "'Consolas','Courier New',monospace";
const GUTTER = 44; // px from left — where margin line sits

// Ruled lines + margin line background
const RULED = `
  repeating-linear-gradient(
    transparent 0,transparent 23px,
    ${P.line} 23px,${P.line} 24px
  ),
  linear-gradient(
    90deg,
    transparent ${GUTTER - 2}px,
    ${P.margin} ${GUTTER - 2}px,
    ${P.margin} ${GUTTER - 1}px,
    transparent ${GUTTER - 1}px
  )
`;

// Severity / type constants
const SEV_ORDER: Severity[]             = ["Critical","High","Medium","Low"];
const SEV_COL:   Record<Severity,string> = {
  Critical: "#c0392b", High: "#d4622a", Medium: "#b8940a", Low: "#2e8050",
};
const TYPE_ICON: Record<IssueType,string> = {
  Bug:"🐛", Change:"🔄", Question:"❓", "New Feature":"✨", Action:"⚡",
};

const NOTEBOOKS = ["Backlog","Sprint 1","Bugs","Feature Requests","Design Review"];

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const MOCK: Issue[] = [
  {
    id:"1", title:"Configurator crashes on iOS 17+", type:"Bug", severity:"Critical",
    description:"The AI wardrobe configurator crashes when users select a finish on iOS 17+ devices. Reproducible 100% of the time in Safari.",
    points:[
      {id:"p1",text:"Reproduces on iPhone 15 Pro / iOS 17.4",completed:true},
      {id:"p2",text:"Confirmed not an Android issue",completed:true},
      {id:"p3",text:"Fix deployed — verify on staging before release",completed:false},
    ],
    notebook:"Backlog", dateAdded:new Date("2026-04-07"), user:"Will",
    status:"Ready for Review", aiStatus:"Ready for Review",
    aiMessage:"Identified a null check issue in the finish selector callback on WebKit. Fix applied in staging — please verify on your iOS device.",
    files:[],
  },
  {
    id:"2", title:"Finance calculator on quote page", type:"New Feature", severity:"High",
    description:"Customers want to see Ideal4Finance monthly payment breakdowns before committing.",
    points:[
      {id:"p4",text:"Integrate Ideal4Finance API endpoint",completed:false},
      {id:"p5",text:"Monthly payment widget on quote screen",completed:false},
    ],
    notebook:"Backlog", dateAdded:new Date("2026-04-08"), user:"Will",
    status:"Open", aiStatus:"Processing", files:[],
  },
  {
    id:"3", title:"Update Egger pricing — May 2026", type:"Change", severity:"Medium",
    description:"Lawcris have issued new trade pricing for Egger decors effective May 2026.",
    points:[{id:"p6",text:"Update all 100+ decor prices in material library",completed:false}],
    notebook:"Backlog", dateAdded:new Date("2026-04-09"), user:"Dave",
    status:"Open", aiStatus:"Idle", files:[],
  },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const uid = () => Math.random().toString(36).slice(2,9);
const fmt = (d: Date) => d.toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"2-digit"});

const aiEnhance = (text: string): Promise<string> =>
  new Promise(res => setTimeout(() => {
    let t = text.trim();
    if (t) {
      t = t[0].toUpperCase() + t.slice(1);
      if (!/[.!?]$/.test(t)) t += ".";
      t = t.replace(/\s+/g," ")
        .replace(/\bi\b/g,"I").replace(/\bcant\b/g,"can't")
        .replace(/\bdont\b/g,"don't").replace(/\bdoesnt\b/g,"doesn't")
        .replace(/\bwont\b/g,"won't").replace(/\bive\b/g,"I've")
        .replace(/\bim\b/g,"I'm");
    }
    res(t);
  }, 1400));

// ─── SHARED MICRO-STYLES ─────────────────────────────────────────────────────

/** A label above an ink field */
const LBL: React.CSSProperties = {
  fontSize:9, color:P.fade, textTransform:"uppercase", letterSpacing:1.4,
  display:"block", marginBottom:2, fontFamily:FONT,
};

/** Ink on paper input — bottom border only, transparent bg */
function inkField(extra?: React.CSSProperties): React.CSSProperties {
  return {
    background:"transparent", border:"none",
    borderBottom:`1px solid ${P.line}`,
    borderRadius:0, padding:"3px 0 2px",
    fontSize:12, fontFamily:FONT, color:P.ink,
    outline:"none", width:"100%", boxSizing:"border-box",
    ...extra,
  };
}

// ─── SEVERITY / TYPE BADGES — stamp style ────────────────────────────────────
function SevBadge({s,small}:{s:Severity;small?:boolean}) {
  const c = SEV_COL[s];
  return (
    <span style={{
      padding:small?"0 4px":"1px 6px", borderRadius:2,
      fontSize:small?8:9, letterSpacing:1, textTransform:"uppercase",
      color:c, border:`1px solid ${c}70`, display:"inline-block", fontFamily:FONT,
    }}>{s}</span>
  );
}

// ─── STAR RATING ─────────────────────────────────��───────────────────────────
function Stars({val,onChange}:{val:number;onChange?:(n:number)=>void}) {
  const [hov,setHov]=useState(0);
  return (
    <span style={{display:"flex",gap:2}}>
      {[1,2,3,4,5].map(n=>(
        <span key={n} onClick={()=>onChange?.(n)}
          onMouseEnter={()=>onChange&&setHov(n)} onMouseLeave={()=>onChange&&setHov(0)}
          style={{fontSize:13,cursor:onChange?"pointer":"default",color:n<=(hov||val)?"#b8940a":P.ghost,transition:"color 0.1s",fontFamily:FONT}}
        >★</span>
      ))}
    </span>
  );
}

// ─── RING STRIP — uses the cover image cropped to top ring area ───────────────
function RingStrip({dark}:{dark:boolean}) {
  const cv = COVER[dark?"dark":"light"];
  return (
    <div style={{height:50,overflow:"hidden",position:"relative",background:cv.edge,lineHeight:0,flexShrink:0}}>
      {/* Cover image — positioned so only the top ring area shows */}
      <img
        src={notebookCover} alt=""
        style={{
          width:"100%", display:"block",
          objectFit:"cover", objectPosition:"center top",
          height:220, // tall but container clips to 50px showing only the top
        }}
      />
      {/* Dark mode tint overlay */}
      {dark && (
        <div style={{position:"absolute",inset:0,background:"rgba(10,22,50,0.55)",mixBlendMode:"multiply"}} />
      )}
      {/* Bottom shadow fade into header */}
      <div style={{position:"absolute",bottom:0,left:0,right:0,height:12,
        background:`linear-gradient(transparent,${cv.bg}88)`}} />
    </div>
  );
}

// ─── PAPER WRAPPER ────────────────────────────────────────────────────────────
function Paper({children}:{children:React.ReactNode}) {
  return (
    <div style={{flex:1,overflow:"hidden",position:"relative",background:P.bg,backgroundImage:RULED,display:"flex",flexDirection:"column"}}>
      {/* Faint brand watermark */}
      <div style={{
        position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%) rotate(-8deg)",
        fontSize:44,fontFamily:"'DM Serif Display',serif",fontWeight:700,
        color:"rgba(100,149,237,0.045)",pointerEvents:"none",whiteSpace:"nowrap",userSelect:"none",zIndex:0,
      }}>◈ sturij</div>
      <div style={{position:"relative",zIndex:1,display:"flex",flexDirection:"column",height:"100%",overflow:"hidden"}}>
        {children}
      </div>
    </div>
  );
}

// ─── TOOLBAR / BACKBAR ────────────────────────────────────────────────────────
function Bar({children}:{children:React.ReactNode}) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:8,padding:`8px 14px 8px ${GUTTER+2}px`,
      borderBottom:`1px solid ${P.line}`,background:P.stamp,flexShrink:0}}>
      {children}
    </div>
  );
}

// ─── INDEX VIEW ───────────────────────────────────────────────────────────────
interface IVP {issues:Issue[];notebooks:string[];nb:string;onNb:(n:string)=>void;onAdd:()=>void;onSelect:(i:Issue)=>void;}
function IndexView({issues,notebooks,nb,onNb,onAdd,onSelect}:IVP) {
  const visible = issues
    .filter(i=>i.notebook===nb && i.status!=="Closed")
    .sort((a,b)=>{
      const s=SEV_ORDER.indexOf(a.severity)-SEV_ORDER.indexOf(b.severity);
      return s!==0?s:b.dateAdded.getTime()-a.dateAdded.getTime();
    });

  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
      <Bar>
        <select value={nb} onChange={e=>onNb(e.target.value)}
          style={{...inkField({fontFamily:FONT,fontSize:11}),flex:1,cursor:"pointer",appearance:"none"}}>
          {notebooks.map(n=><option key={n} value={n}>{n}</option>)}
        </select>
        <button onClick={onAdd} style={{background:"none",border:`1px solid ${P.ghost}`,borderRadius:2,
          padding:"2px 9px",fontSize:9,cursor:"pointer",color:P.fade,fontFamily:FONT,letterSpacing:0.8,whiteSpace:"nowrap"}}>
          + new entry
        </button>
      </Bar>

      <NbScroll style={{flex:1}}>
        {visible.length===0 ? (
          <div style={{padding:"40px 20px 40px "+GUTTER+"px",color:P.ghost,fontSize:11,fontFamily:FONT,lineHeight:1.7}}>
            — no open issues in {nb}.<br/>
            <span onClick={onAdd} style={{color:P.fade,cursor:"pointer",textDecoration:"underline",fontSize:10}}>
              add the first entry
            </span>
          </div>
        ) : (
          visible.map((issue,idx)=>(
            <div key={issue.id} onClick={()=>onSelect(issue)}
              style={{display:"flex",alignItems:"flex-start",gap:8,padding:`6px 14px 6px ${GUTTER+2}px`,
                cursor:"pointer",borderBottom:`1px solid ${P.line}`,transition:"background 0.1s",minHeight:52}}
              onMouseEnter={e=>(e.currentTarget.style.background="rgba(100,149,237,0.04)")}
              onMouseLeave={e=>(e.currentTarget.style.background="transparent")}
            >
              {/* Severity stripe */}
              <div style={{width:2,minHeight:40,borderRadius:1,background:SEV_COL[issue.severity],flexShrink:0,opacity:0.65}} />
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",gap:4,marginBottom:2,flexWrap:"wrap",alignItems:"center"}}>
                  <SevBadge s={issue.severity} small />
                  <span style={{fontSize:8,color:P.ghost,fontFamily:FONT}}>{TYPE_ICON[issue.type]} {issue.type}</span>
                </div>
                <div style={{fontSize:11,color:P.ink,lineHeight:1.4,marginBottom:2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontFamily:FONT}}>
                  {idx+1}. {issue.title}
                </div>
                <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                  <span style={{fontSize:9,color:P.ghost,fontFamily:FONT}}>{fmt(issue.dateAdded)}</span>
                  <span style={{fontSize:9,color:P.ghost,fontFamily:FONT}}>{issue.user}</span>
                  {issue.aiStatus==="Ready for Review" && <span style={{fontSize:9,color:"#b8940a",fontFamily:FONT}}>● review ready</span>}
                  {issue.aiStatus==="Processing"       && <span style={{fontSize:9,color:"#4a8060",fontFamily:FONT}}>⟳ ai working</span>}
                </div>
              </div>
              <div style={{textAlign:"right",flexShrink:0}}>
                {issue.points.length>0 && (
                  <span style={{fontSize:9,color:P.ghost,fontFamily:FONT}}>
                    {issue.points.filter(p=>p.completed).length}/{issue.points.length}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </NbScroll>

      <div style={{padding:`4px 14px 4px ${GUTTER+2}px`,borderTop:`1px solid ${P.line}`,
        fontSize:9,color:P.ghost,fontFamily:FONT,display:"flex",justifyContent:"space-between",
        background:P.stamp,flexShrink:0}}>
        <span>{visible.length} open</span>
        <span>severity → date</span>
      </div>
    </div>
  );
}

// ─── ADD ENTRY VIEW ─────────────────────────────────────���─────────────────────
interface AVP {notebooks:string[];nb:string;onSubmit:(d:Omit<Issue,"id"|"dateAdded"|"status"|"aiStatus"|"aiMessage"|"aiRating">)=>Promise<boolean>;onBack:()=>void;}
function AddEntryView({notebooks,nb,onSubmit,onBack}:AVP) {
  const [title,setTitle]=useState("");
  const [type,setType]=useState<IssueType>("Bug");
  const [sev,setSev]=useState<Severity>("Medium");
  const [notebook,setNotebook]=useState(nb);
  const [desc,setDesc]=useState("");
  const [enhancing,setEnhancing]=useState(false);
  const [points,setPoints]=useState<IssuePoint[]>([]);
  const [pt,setPt]=useState("");
  const [files,setFiles]=useState<AttachedFile[]>([]);
  const [submitting,setSubmitting]=useState(false);
  const [err,setErr]=useState("");
  const fileRef=useRef<HTMLInputElement>(null);
  const camRef=useRef<HTMLInputElement>(null);

  const addPt=()=>{ if(!pt.trim())return; setPoints(p=>[...p,{id:uid(),text:pt.trim(),completed:false}]); setPt(""); };

  const handleEnhance=async()=>{ if(!desc.trim()||enhancing)return; setEnhancing(true); setDesc(await aiEnhance(desc)); setEnhancing(false); };

  const readFiles=(fl:FileList|null)=>{
    if(!fl)return;
    Array.from(fl).forEach(f=>{
      const r=new FileReader();
      r.onload=()=>setFiles(prev=>[...prev,{id:uid(),name:f.name,dataUrl:r.result as string,isImage:f.type.startsWith("image/")}]);
      r.readAsDataURL(f);
    });
  };

  const handleSubmit=async()=>{
    if(!title.trim()){setErr("title is required.");return;}
    if(desc.trim().length<20 && points.length===0){setErr("description too brief — the ai needs more context to work with.");return;}
    setErr(""); setSubmitting(true);
    const ok=await onSubmit({title:title.trim(),type,severity:sev,description:desc.trim(),points,notebook,user:"Will",files});
    if(!ok) setErr("ai rejected this entry — please add more detail and resubmit.");
    setSubmitting(false);
  };

  const thinBtn: React.CSSProperties = {
    background:"none",border:`1px solid ${P.ghost}`,borderRadius:2,
    padding:"2px 8px",fontSize:9,cursor:"pointer",color:P.fade,fontFamily:FONT,letterSpacing:0.6,
  };

  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
      <Bar>
        <button onClick={onBack} style={{background:"none",border:"none",cursor:"pointer",color:P.fade,fontSize:10,padding:"0",fontFamily:FONT}}>← back</button>
        <span style={{fontSize:10,color:P.ink,flex:1,fontFamily:FONT}}>new entry</span>
      </Bar>

      <NbScroll style={{flex:1,padding:`10px 14px 10px ${GUTTER+2}px`,display:"flex",flexDirection:"column",gap:11}}>

        {/* Notebook */}
        <div>
          <label style={LBL}>notebook</label>
          <select value={notebook} onChange={e=>setNotebook(e.target.value)} style={inkField({cursor:"pointer",appearance:"none"} as React.CSSProperties)}>
            {notebooks.map(n=><option key={n} value={n}>{n}</option>)}
          </select>
        </div>

        {/* Title */}
        <div>
          <label style={LBL}>title *</label>
          <input type="text" value={title} onChange={e=>setTitle(e.target.value)}
            placeholder="clear, concise issue title…" style={inkField({fontSize:13})} />
        </div>

        {/* Type + Severity */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          <div>
            <label style={LBL}>type</label>
            <select value={type} onChange={e=>setType(e.target.value as IssueType)} style={inkField({cursor:"pointer",appearance:"none"} as React.CSSProperties)}>
              {(["Bug","Change","Question","New Feature","Action"] as IssueType[]).map(t=>(
                <option key={t} value={t}>{TYPE_ICON[t]} {t}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={LBL}>severity</label>
            <select value={sev} onChange={e=>setSev(e.target.value as Severity)}
              style={inkField({cursor:"pointer",appearance:"none",color:SEV_COL[sev],fontWeight:400} as React.CSSProperties)}>
              {(["Critical","High","Medium","Low"] as Severity[]).map(s=>(
                <option key={s} value={s} style={{color:SEV_COL[s]}}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:2}}>
            <label style={{...LBL,marginBottom:0}}>description</label>
            <button onClick={handleEnhance} disabled={enhancing||!desc.trim()} style={{
              ...thinBtn, color:enhancing?"#4a8060":P.fade, opacity:!desc.trim()?0.35:1,
            }}>{enhancing?"⟳ enhancing…":"✨ ai enhance"}</button>
          </div>
          <textarea value={desc} onChange={e=>setDesc(e.target.value)}
            placeholder="describe context, expected vs actual behaviour…"
            rows={3} style={{...inkField({lineHeight:1.7,borderBottom:"none"}),
              border:`1px solid ${P.line}`,padding:"4px 0",resize:"vertical" as const}} />
        </div>

        {/* Issue points */}
        <div>
          <label style={LBL}>issue points</label>
          {points.map(p=>(
            <div key={p.id} style={{display:"flex",alignItems:"flex-start",gap:6,marginBottom:3}}>
              <span style={{fontSize:9,color:P.ghost,marginTop:4,flexShrink:0,fontFamily:FONT}}>—</span>
              <span style={{flex:1,fontSize:11,color:P.ink,lineHeight:1.5,fontFamily:FONT}}>{p.text}</span>
              <button onClick={()=>setPoints(ps=>ps.filter(x=>x.id!==p.id))}
                style={{background:"none",border:"none",cursor:"pointer",color:SEV_COL.Critical+"88",fontSize:13,padding:"0 2px",flexShrink:0,fontFamily:FONT,lineHeight:1}}>×</button>
            </div>
          ))}
          <div style={{display:"flex",gap:6}}>
            <input type="text" value={pt} onChange={e=>setPt(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&addPt()}
              placeholder="add specific point… (Enter)" style={{...inkField(),flex:1}} />
            <button onClick={addPt} disabled={!pt.trim()} style={{...thinBtn,opacity:pt.trim()?1:0.3,flexShrink:0}}>+</button>
          </div>
        </div>

        {/* Attachments */}
        <div>
          <label style={LBL}>attachments</label>
          {files.length>0 && (
            <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:5}}>
              {files.map(f=>(
                <span key={f.id} style={{fontSize:9,color:P.fade,fontFamily:FONT}}>
                  {f.isImage?"🖼":"📎"} {f.name.length>14?f.name.slice(0,14)+"…":f.name}
                  <span onClick={()=>setFiles(fs=>fs.filter(x=>x.id!==f.id))}
                    style={{cursor:"pointer",color:SEV_COL.Critical+"88",marginLeft:3}}>×</span>
                </span>
              ))}
            </div>
          )}
          <input ref={fileRef} type="file" multiple style={{display:"none"}} onChange={e=>{readFiles(e.target.files);e.target.value="";}} />
          <input ref={camRef} type="file" accept="image/*" style={{display:"none"}} onChange={e=>{readFiles(e.target.files);e.target.value="";}} />
          <div style={{display:"flex",gap:14}}>
            {[{icon:"📎",label:"attach file",ref:fileRef},{icon:"📷",label:"screenshot",ref:camRef}].map(b=>(
              <button key={b.label} onClick={()=>b.ref.current?.click()}
                style={{background:"none",border:"none",padding:0,fontSize:10,color:P.fade,cursor:"pointer",fontFamily:FONT}}>
                {b.icon} {b.label}
              </button>
            ))}
          </div>
        </div>

        {/* Error */}
        {err && (
          <div style={{fontSize:10,color:SEV_COL.Critical,fontFamily:FONT,lineHeight:1.6,
            borderLeft:`2px solid ${SEV_COL.Critical}66`,paddingLeft:8}}>
            {err}
          </div>
        )}

        {/* Submit */}
        <button onClick={handleSubmit} disabled={submitting} style={{
          background:"transparent",border:`1px solid ${P.ghost}`,borderRadius:2,
          padding:"8px",fontSize:10,cursor:submitting?"default":"pointer",
          color:P.ink,fontFamily:FONT,letterSpacing:0.5,transition:"border-color 0.15s",
        }}
          onMouseEnter={e=>!submitting&&((e.currentTarget as HTMLElement).style.borderColor=P.fade)}
          onMouseLeave={e=>((e.currentTarget as HTMLElement).style.borderColor=P.ghost)}
        >
          {submitting?"⟳ ai reviewing entry…":"submit to notebook →"}
        </button>
      </NbScroll>
    </div>
  );
}

// ─── DETAIL VIEW ──────────────────────────────────────────────────────────────
interface DVP {issue:Issue;onBack:()=>void;onUpdate:(i:Issue)=>void;}
function DetailView({issue,onBack,onUpdate}:DVP) {
  const fileRef=useRef<HTMLInputElement>(null);
  const camRef=useRef<HTMLInputElement>(null);

  const togglePt=(id:string)=>{
    const pts=issue.points.map(p=>p.id===id?{...p,completed:!p.completed}:p);
    const allDone=pts.length>0 && pts.every(p=>p.completed);
    onUpdate({...issue,points:pts,status:allDone?"Closed":issue.status});
  };

  const readFiles=(fl:FileList|null)=>{
    if(!fl)return;
    Array.from(fl).forEach(f=>{
      const r=new FileReader();
      r.onload=()=>onUpdate({...issue,files:[...issue.files,{id:uid(),name:f.name,dataUrl:r.result as string,isImage:f.type.startsWith("image/")}]});
      r.readAsDataURL(f);
    });
  };

  const allDone=issue.points.length>0 && issue.points.every(p=>p.completed);

  const sectionTitle: React.CSSProperties = {
    fontSize:9,color:P.fade,textTransform:"uppercase",letterSpacing:1.4,
    fontFamily:FONT,marginBottom:5,display:"block",
  };

  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
      <Bar>
        <button onClick={onBack} style={{background:"none",border:"none",cursor:"pointer",color:P.fade,fontSize:10,padding:"0",fontFamily:FONT}}>← back</button>
        <span style={{fontSize:10,color:P.ink,flex:1,fontFamily:FONT}}>issue detail</span>
        {issue.status==="Closed" && (
          <span style={{fontSize:8,color:SEV_COL.Low,border:`1px solid ${SEV_COL.Low}88`,borderRadius:2,padding:"1px 5px",fontFamily:FONT,letterSpacing:1}}>CLOSED</span>
        )}
      </Bar>

      <NbScroll style={{flex:1,padding:`10px 14px 10px ${GUTTER+2}px`,display:"flex",flexDirection:"column",gap:12}}>

        {/* Title block */}
        <div>
          <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:5,alignItems:"center"}}>
            <SevBadge s={issue.severity} />
            <span style={{fontSize:9,color:P.ghost,fontFamily:FONT}}>{TYPE_ICON[issue.type]} {issue.type}</span>
          </div>
          <div style={{fontSize:13,color:P.ink,lineHeight:1.4,fontFamily:FONT,marginBottom:4}}>{issue.title}</div>
          <div style={{fontSize:9,color:P.ghost,fontFamily:FONT}}>
            {fmt(issue.dateAdded)} · {issue.user} · {issue.notebook}
          </div>
        </div>

        {/* Description */}
        {issue.description && (
          <div>
            <span style={sectionTitle}>description</span>
            <div style={{fontSize:11,color:P.ink,lineHeight:1.7,fontFamily:FONT,
              borderLeft:`2px solid ${P.line}`,paddingLeft:8}}>
              {issue.description}
            </div>
          </div>
        )}

        {/* Points */}
        {issue.points.length>0 && (
          <div>
            <span style={sectionTitle}>
              issue points — {issue.points.filter(p=>p.completed).length}/{issue.points.length}
            </span>
            {issue.points.map(p=>(
              <div key={p.id} onClick={()=>togglePt(p.id)}
                style={{display:"flex",alignItems:"flex-start",gap:8,padding:"5px 6px",marginBottom:2,
                  borderRadius:2,cursor:"pointer",transition:"background 0.1s",
                  background:p.completed?"rgba(46,128,80,0.06)":"transparent"}}
                onMouseEnter={e=>!p.completed&&(e.currentTarget.style.background="rgba(100,149,237,0.05)")}
                onMouseLeave={e=>(e.currentTarget.style.background=p.completed?"rgba(46,128,80,0.06)":"transparent")}
              >
                {/* Checkbox */}
                <div style={{width:13,height:13,border:`1.5px solid ${p.completed?SEV_COL.Low:P.ghost}`,
                  borderRadius:2,background:p.completed?SEV_COL.Low:"transparent",
                  display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1,transition:"all 0.15s"}}>
                  {p.completed&&<span style={{color:"#fff",fontSize:9,fontFamily:FONT,lineHeight:1}}>✓</span>}
                </div>
                <span style={{fontSize:11,color:p.completed?P.ghost:P.ink,
                  textDecoration:p.completed?"line-through":"none",lineHeight:1.4,fontFamily:FONT}}>
                  {p.text}
                </span>
              </div>
            ))}
            {allDone && (
              <div style={{fontSize:10,color:SEV_COL.Low,fontFamily:FONT,paddingLeft:6,marginTop:3}}>
                ✓ all points complete — issue closed
              </div>
            )}
          </div>
        )}

        {/* AI status */}
        <div>
          <span style={sectionTitle}>ai status</span>
          <div style={{borderLeft:`2px solid ${P.line}`,paddingLeft:8,display:"flex",flexDirection:"column",gap:6}}>
            {issue.aiStatus==="Idle" && (
              <div style={{fontSize:10,color:P.ghost,fontFamily:FONT}}>waiting to be picked up.</div>
            )}
            {issue.aiStatus==="Processing" && (
              <div style={{fontSize:10,color:"#4a8060",fontFamily:FONT}}>⟳ ai agent is working on this…</div>
            )}
            {issue.aiStatus==="Ready for Review" && (
              <div>
                <div style={{fontSize:9,color:"#b8940a",fontFamily:FONT,marginBottom:5,letterSpacing:0.5}}>● READY FOR REVIEW</div>
                {issue.aiMessage && (
                  <div style={{fontSize:10,color:P.ink,lineHeight:1.6,fontFamily:FONT,marginBottom:8,
                    borderLeft:`2px solid rgba(184,148,10,0.4)`,paddingLeft:6,fontStyle:"italic"}}>
                    "{issue.aiMessage}"
                  </div>
                )}
                <div style={{display:"flex",gap:8}}>
                  <button onClick={()=>onUpdate({...issue,aiStatus:"Idle",status:"Open"})}
                    style={{flex:1,background:"none",border:`1px solid ${SEV_COL.Low}88`,borderRadius:2,
                      padding:"5px",fontSize:10,fontWeight:400,cursor:"pointer",color:SEV_COL.Low,fontFamily:FONT}}>
                    ✓ accept
                  </button>
                  <button onClick={()=>onUpdate({...issue,aiStatus:"Processing",status:"Open",aiMessage:undefined})}
                    style={{flex:1,background:"none",border:`1px solid ${SEV_COL.Critical}88`,borderRadius:2,
                      padding:"5px",fontSize:10,fontWeight:400,cursor:"pointer",color:SEV_COL.Critical,fontFamily:FONT}}>
                    ✗ reject
                  </button>
                </div>
              </div>
            )}
            {issue.aiStatus==="Rejected" && (
              <div style={{fontSize:10,color:SEV_COL.Critical,fontFamily:FONT}}>returned for clarification — add more detail.</div>
            )}
            <div style={{display:"flex",alignItems:"center",gap:6,paddingTop:4}}>
              <span style={{fontSize:9,color:P.ghost,fontFamily:FONT}}>rate ai:</span>
              <Stars val={issue.aiRating||0} onChange={n=>onUpdate({...issue,aiRating:n})} />
            </div>
          </div>
        </div>

        {/* Files */}
        <div>
          <span style={sectionTitle}>attachments</span>
          {issue.files.length>0 && (
            <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:6}}>
              {issue.files.map(f=>(
                <div key={f.id} style={{display:"flex",alignItems:"center",gap:4,fontSize:9,color:P.fade,fontFamily:FONT}}>
                  {f.isImage
                    ?<img src={f.dataUrl} alt={f.name} style={{width:22,height:22,objectFit:"cover",borderRadius:1,border:`1px solid ${P.line}`}}/>
                    :"📎"}
                  {f.name.length>16?f.name.slice(0,16)+"…":f.name}
                </div>
              ))}
            </div>
          )}
          <input ref={fileRef} type="file" multiple style={{display:"none"}} onChange={e=>{readFiles(e.target.files);e.target.value="";}} />
          <input ref={camRef} type="file" accept="image/*" style={{display:"none"}} onChange={e=>{readFiles(e.target.files);e.target.value="";}} />
          <div style={{display:"flex",gap:14}}>
            {[{icon:"📎",label:"attach file",ref:fileRef},{icon:"📷",label:"screenshot",ref:camRef}].map(b=>(
              <button key={b.label} onClick={()=>b.ref.current?.click()}
                style={{background:"none",border:"none",padding:0,fontSize:10,color:P.fade,cursor:"pointer",fontFamily:FONT}}>
                {b.icon} {b.label}
              </button>
            ))}
          </div>
        </div>
      </NbScroll>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export function SturijNotebook() {
  const [open,setOpen]=useState(false);
  const [view,setView]=useState<View>("index");
  const [nb,setNb]=useState("Backlog");
  const [issues,setIssues]=useState<Issue[]>(MOCK);
  const [selected,setSelected]=useState<Issue|null>(null);
  const [dark,setDark]=useState(false);
  const [pos,setPos]=useState({x:typeof window!=="undefined"?window.innerWidth-420:20,y:40});
  const [dragging,setDragging]=useState(false);
  const dragOff=useRef({x:0,y:0});
  const boxRef=useRef<HTMLDivElement>(null);

  const cv = COVER[dark?"dark":"light"];

  const onMouseDown=useCallback((e:React.MouseEvent)=>{
    e.preventDefault();
    if(!boxRef.current)return;
    const r=boxRef.current.getBoundingClientRect();
    dragOff.current={x:e.clientX-r.left,y:e.clientY-r.top};
    setDragging(true);
  },[]);

  useEffect(()=>{
    if(!dragging)return;
    const mv=(e:MouseEvent)=>setPos({
      x:Math.max(0,Math.min(window.innerWidth-(open?410:68),e.clientX-dragOff.current.x)),
      y:Math.max(0,Math.min(window.innerHeight-(open?60:80),e.clientY-dragOff.current.y)),
    });
    const up=()=>setDragging(false);
    window.addEventListener("mousemove",mv);
    window.addEventListener("mouseup",up);
    return()=>{window.removeEventListener("mousemove",mv);window.removeEventListener("mouseup",up);};
  },[dragging,open]);

  const handleSubmit=async(d:Omit<Issue,"id"|"dateAdded"|"status"|"aiStatus"|"aiMessage"|"aiRating">):Promise<boolean>=>{
    if(d.description.length<20 && d.points.length===0)return false;
    const id=uid();
    setIssues(prev=>[...prev,{...d,id,dateAdded:new Date(),status:"Open",aiStatus:"Processing",files:d.files}]);
    setNb(d.notebook);
    setView("index");
    setTimeout(()=>setIssues(prev=>prev.map(i=>i.id===id?{
      ...i,aiStatus:"Ready for Review",
      aiMessage:`I've reviewed this ${i.type.toLowerCase()} and have a proposed fix ready. Please check and confirm.`,
    }:i)),5000);
    return true;
  };

  const handleUpdate=(updated:Issue)=>{
    setIssues(prev=>prev.map(i=>i.id===updated.id?updated:i));
    setSelected(updated);
    if(updated.status==="Closed"){
      setTimeout(()=>{setView("index");setSelected(null);},1400);
    }
  };

  const hasNotif=issues.some(i=>i.aiStatus==="Ready for Review");

  // ── Bubble ──────────────────────────────────────────────────────────────────
  if(!open){
    return (
      <div ref={boxRef} style={{position:"fixed",left:pos.x,top:pos.y,zIndex:9999,
        cursor:dragging?"grabbing":"grab",userSelect:"none"}} onMouseDown={onMouseDown}>
        {/* Mini notebook cover */}
        <div onClick={()=>setOpen(true)} style={{
          width:58,borderRadius:"6px 6px 4px 4px",overflow:"hidden",
          boxShadow:`0 6px 28px ${cv.shadow}, 0 2px 8px rgba(0,0,0,0.2)`,
          cursor:"pointer",transition:"transform 0.15s,box-shadow 0.15s",
          border:`1.5px solid ${cv.edge}`,
        }}
          onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform="scale(1.06)";(e.currentTarget as HTMLElement).style.boxShadow=`0 10px 36px ${cv.shadow}`;}}
          onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform="";(e.currentTarget as HTMLElement).style.boxShadow=`0 6px 28px ${cv.shadow}, 0 2px 8px rgba(0,0,0,0.2)`;}}
        >
          {/* Ring strip — actual cover image, top portion */}
          <div style={{height:32,overflow:"hidden",lineHeight:0,background:cv.edge}}>
            <img src={notebookCover} alt="" style={{width:"100%",height:120,objectFit:"cover",objectPosition:"center top",display:"block",opacity:dark?0.7:1}} />
            {dark && <div style={{position:"absolute",inset:0,background:"rgba(10,22,50,0.5)"}} />}
          </div>
          {/* Blue cover body */}
          <div style={{background:cv.bg,padding:"8px 0 10px",display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
            <span style={{fontSize:8,fontFamily:FONT,color:cv.text+"cc",letterSpacing:1.5,textTransform:"uppercase"}}>sturij</span>
            <span style={{fontSize:18,lineHeight:1}}>📓</span>
          </div>
        </div>
        {hasNotif && (
          <div style={{position:"absolute",top:-3,right:-3,width:12,height:12,
            background:"#b8940a",borderRadius:"50%",border:"2px solid #fff"}} />
        )}
      </div>
    );
  }

  // ── Open notebook ────────────────────────────────────────────────────────────
  return (
    <div ref={boxRef} style={{
      position:"fixed",left:pos.x,top:pos.y,zIndex:9999,
      width:400,height:580,
      display:"flex",flexDirection:"column",
      borderRadius:"8px 8px 6px 6px",overflow:"hidden",
      boxShadow:dragging
        ?`0 28px 64px ${cv.shadow}, 0 0 0 1px rgba(255,255,255,0.06)`
        :`0 12px 48px ${cv.shadow}, 0 2px 12px rgba(0,0,0,0.2)`,
      userSelect:"none",
      transition:dragging?"none":"box-shadow 0.25s",
    }}>
      {/* Ring strip — drag handle, shows rings from cover image */}
      <div onMouseDown={onMouseDown} style={{cursor:dragging?"grabbing":"grab",flexShrink:0,position:"relative"}}>
        <RingStrip dark={dark} />
      </div>

      {/* Blue / navy header */}
      <div onMouseDown={onMouseDown} style={{
        background:cv.bg, padding:"7px 12px",
        display:"flex",alignItems:"center",gap:8,
        cursor:dragging?"grabbing":"grab",flexShrink:0,
        borderBottom:`2px solid ${cv.edge}`,
      }}>
        <div style={{flex:1,fontFamily:"'DM Serif Display',serif",fontSize:14,fontWeight:700,color:cv.text,letterSpacing:-0.3}}>
          ◈ sturij<sup style={{fontSize:7,verticalAlign:"super",fontFamily:FONT}}>™</sup>
          <span style={{fontFamily:FONT,fontSize:9,fontWeight:400,marginLeft:8,opacity:0.6,letterSpacing:1}}>NOTEBOOK</span>
        </div>
        <button onMouseDown={e=>e.stopPropagation()} onClick={()=>setDark(d=>!d)}
          style={{background:"rgba(0,0,0,0.12)",border:"none",borderRadius:3,padding:"2px 6px",fontSize:11,cursor:"pointer",color:cv.text}}>
          {dark?"☀️":"🌙"}
        </button>
        <button onMouseDown={e=>e.stopPropagation()} onClick={()=>setOpen(false)}
          style={{background:"rgba(0,0,0,0.12)",border:"none",borderRadius:3,padding:"2px 7px",fontSize:14,cursor:"pointer",color:cv.text,lineHeight:1}}>
          ×
        </button>
      </div>

      {/* Always-cream lined paper */}
      <Paper>
        {view==="index" && (
          <IndexView issues={issues} notebooks={NOTEBOOKS} nb={nb} onNb={setNb}
            onAdd={()=>setView("add")}
            onSelect={i=>{setSelected(i);setView("detail");}} />
        )}
        {view==="add" && (
          <AddEntryView notebooks={NOTEBOOKS} nb={nb} onSubmit={handleSubmit} onBack={()=>setView("index")} />
        )}
        {view==="detail" && selected && (
          <DetailView
            issue={issues.find(i=>i.id===selected.id)||selected}
            onBack={()=>{setView("index");setSelected(null);}}
            onUpdate={handleUpdate} />
        )}
      </Paper>
    </div>
  );
}