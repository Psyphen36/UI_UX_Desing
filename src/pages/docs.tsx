import { useEffect, useState, useCallback, ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { 
  Loader, 
  FileText, 
  ChevronRight, 
  Menu, 
  X, 
  Home, 
  ArrowLeft,
  Book,
  Search,
  Hash
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface Doc {
  filename: string;
  content: string;
}

interface DocsListResponse {
  files: string[];
}

interface DocContentResponse {
  content: string;
}

interface CheckboxStates {
  [key: string]: boolean;
}

interface MarkdownInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  node?: any;
}

interface MarkdownPreProps extends React.HTMLAttributes<HTMLPreElement> {
  children?: ReactNode;
}

interface MarkdownCodeProps extends React.HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  className?: string;
}

interface MarkdownTableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  children?: ReactNode;
}

interface MarkdownThProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  children?: ReactNode;
}

interface MarkdownTdProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children?: ReactNode;
}

interface MarkdownHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: ReactNode;
}

interface MarkdownBlockquoteProps extends React.BlockquoteHTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

function formatLabel(name: string): string {
  return name.replace(/_/g, " ").replace(/\.md$/, "").replace(/\b\w/g, l => l.toUpperCase());
}

export default function DevDocs(): JSX.Element {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [checkboxStates, setCheckboxStates] = useState<CheckboxStates>({});
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocs = async (): Promise<void> => {
      setLoading(true);
      try {
        const listRes = await fetch("/api/dev_docs", { credentials: "include" });
        const { files }: DocsListResponse = await listRes.json();

        const contents = await Promise.all<Doc>(
          files.map(async (filename: string): Promise<Doc> => {
            try {
              const res = await fetch(`/api/dev_docs/${filename}`, { credentials: "include" });
              const { content }: DocContentResponse = await res.json();
              return { filename, content };
            } catch {
              return {
                filename,
                content: `# ${formatLabel(filename)}\n\n⚠️ Could not load real content.`,
              };
            }
          })
        );

        setDocs(contents as unknown as Doc[]);
        if (contents.length > 0) setActiveTab(contents[0].filename);
      } catch (err) {
        console.warn("⚠️ Backend unavailable, loading dummy docs instead.");
        // fallback placeholder docs
        const dummyDocs = [
          {
            filename: "getting_started.md",
            content: `# Getting Started\n\nWelcome to the documentation.\n\n- [x] Placeholder checklist item\n- [ ] Another task here.`,
          },
          {
            filename: "api_reference.md",
            content: `# API Reference\n\n\`\`\`bash\ncurl https://api.example.com/v1/hello\n\`\`\`\n\n> This is a mocked API reference.`,
          },
          {
            filename: "faq.md",
            content: `# FAQ\n\n### Q: Is this real?\nA: No, this is just fallback content.\n\n### Q: Will it work with the backend later?\nA: Yes. Nothing to change.`,
          },
        ];
        setDocs(dummyDocs);
        setActiveTab(dummyDocs[0].filename);
      } finally {
        setLoading(false);
      }
    };

    fetchDocs();
  }, []);


  useEffect(() => {
    const lastViewed = localStorage.getItem("lastDoc");
    if (lastViewed) setActiveTab(lastViewed);
  }, []);

  useEffect(() => {
    if (activeTab) localStorage.setItem("lastDoc", activeTab);
  }, [activeTab]);

  const handleCheckboxChange = useCallback((id: string, checked: boolean) => {
    setCheckboxStates(prev => ({ ...prev, [id]: checked }));
  }, []);

  docs.sort((a, b) => a.filename.localeCompare(b.filename));

  const filteredDocs = docs.filter(doc => 
    formatLabel(doc.filename).toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentDoc = docs.find(doc => doc.filename === activeTab);

  const goBack = (): void => {
    navigate("/dashboard");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader className="animate-spin h-6 w-6 text-primary" />
          <span className="text-lg font-medium">Loading documentation...</span>
        </div>
      </div>
    );
  }

  if (docs.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
            <FileText className="h-16 w-16 mx-auto text-primary relative z-10" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground">No Documentation Found</h2>
          <p className="text-muted-foreground max-w-md">
            No documentation files are currently available. Please check back later.
          </p>
          <Button onClick={goBack} variant="outline" className="mt-4">
            <Home className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={goBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <Book className="h-5 w-5 text-primary" />
              <h1 className="text-lg font-semibold text-foreground">Documentation</h1>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden"
          >
            {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className={cn(
          "fixed lg:relative top-0 left-0 z-40 h-full transition-all duration-300 ease-in-out border-r border-border bg-card/30 backdrop-blur-md",
          sidebarOpen ? "w-80 translate-x-0" : "w-0 -translate-x-full lg:w-0"
        )}>
          <div className="flex flex-col h-full">
            {/* Desktop Header */}
            <div className="hidden lg:block p-6 border-b border-border bg-card/20">
              <div className="flex items-center gap-3 mb-2">
                <Button variant="ghost" size="sm" onClick={goBack}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Book className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-semibold text-foreground">Documentation</h1>
              </div>
              <p className="text-sm text-muted-foreground">Developer guides and API references</p>
            </div>

            {/* Search */}
            <div className="p-4 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
              </div>
            </div>

            {/* Navigation */}
            <ScrollArea className="flex-1 p-4">
              <nav className="space-y-2">
                {filteredDocs.map((doc) => (
                  <Button
                    key={doc.filename}
                    variant={activeTab === doc.filename ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start text-left h-auto p-3 font-normal group",
                      activeTab === doc.filename 
                        ? "bg-primary/10 text-primary border border-primary/20 shadow-sm" 
                        : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                    )}
                    onClick={() => {
                      setActiveTab(doc.filename);
                      setSidebarOpen(false); // Close sidebar on mobile after selection
                    }}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className={cn(
                        "p-1.5 rounded-md",
                        activeTab === doc.filename 
                          ? "bg-primary/20 text-primary" 
                          : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                      )}>
                        <Hash className="h-3 w-3" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium">{formatLabel(doc.filename)}</div>
                      </div>
                    </div>
                    {activeTab === doc.filename && (
                      <ChevronRight className="h-4 w-4 ml-auto flex-shrink-0 text-primary" />
                    )}
                  </Button>
                ))}
              </nav>
            </ScrollArea>

            {/* Footer */}
            <div className="p-4 border-t border-border bg-muted/20">
              <p className="text-xs text-muted-foreground text-center">
                {docs.length} document{docs.length !== 1 ? 's' : ''} available
              </p>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {currentDoc ? (
            <>
              {/* Content Header */}
              <div className="border-b border-border bg-card/20 backdrop-blur-md sticky top-0 z-20">
                <div className="px-6 lg:px-8 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">
                        {formatLabel(currentDoc.filename)}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Last updated: {new Date().toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-auto">
                <div className="max-w-4xl mx-auto p-6 lg:p-8">
                  <article className="prose prose-gray dark:prose-invert max-w-none prose-headings:scroll-m-20 prose-headings:font-semibold prose-h1:text-3xl prose-h1:text-foreground prose-h2:text-2xl prose-h2:text-foreground prose-h3:text-xl prose-h3:text-foreground prose-p:text-muted-foreground prose-p:leading-7 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-code:relative prose-code:rounded prose-code:bg-muted prose-code:px-[0.3rem] prose-code:py-[0.2rem] prose-code:text-sm prose-code:font-mono prose-pre:overflow-x-auto prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-muted-foreground prose-ul:list-disc prose-ol:list-decibmal prose-li:text-muted-foreground prose-strong:text-foreground">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        input: ({ node, ...props }: MarkdownInputProps) => {
                          if (props.type === "checkbox") {
                            const id = `${currentDoc.filename}::${node?.position?.start?.line}`;
                            const isChecked = checkboxStates[id] ?? props.checked ?? false;
                            
                            return (
                              <Checkbox
                                id={id}
                                checked={isChecked}
                                onCheckedChange={(checked) => handleCheckboxChange(id, checked as boolean)}
                                className="mr-2 mt-1"
                              />
                            );
                          }
                          return <input {...props} />;
                        },
                        // Enhanced code blocks
                        pre: ({ children, ...props }: MarkdownPreProps) => (
                          <pre className="relative overflow-x-auto rounded-lg border border-border bg-muted p-4 my-6" {...props}>
                            {children}
                          </pre>
                        ),
                        code: ({ children, className, ...props }: MarkdownCodeProps) => {
                          const isInlineCode = !className;
                          return isInlineCode ? (
                            <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                              {children}
                            </code>
                          ) : (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          );
                        },
                        // Enhanced tables
                        table: ({ children, ...props }: MarkdownTableProps) => (
                          <div className="my-6 w-full overflow-y-auto">
                            <table className="w-full border-collapse border border-border rounded-lg overflow-hidden" {...props}>
                              {children}
                            </table>
                          </div>
                        ),
                        th: ({ children, ...props }: MarkdownThProps) => (
                          <th className="border border-border px-4 py-3 text-left font-semibold bg-muted/50 text-foreground" {...props}>
                            {children}
                          </th>
                        ),
                        td: ({ children, ...props }: MarkdownTdProps) => (
                          <td className="border border-border px-4 py-3 text-muted-foreground" {...props}>
                            {children}
                          </td>
                        ),
                        // Enhanced headings with better spacing
                        h1: ({ children, ...props }: MarkdownHeadingProps) => (
                          <h1 className="text-3xl font-bold text-foreground mt-8 mb-4 first:mt-0" {...props}>
                            {children}
                          </h1>
                        ),
                        h2: ({ children, ...props }: MarkdownHeadingProps) => (
                          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4 first:mt-0" {...props}>
                            {children}
                          </h2>
                        ),
                        h3: ({ children, ...props }: MarkdownHeadingProps) => (
                          <h3 className="text-xl font-semibold text-foreground mt-6 mb-3 first:mt-0" {...props}>
                            {children}
                          </h3>
                        ),
                        // Enhanced blockquotes
                        blockquote: ({ children, ...props }: MarkdownBlockquoteProps) => (
                          <blockquote className="border-l-4 border-primary bg-primary/5 pl-6 py-2 my-6 italic text-muted-foreground" {...props}>
                            {children}
                          </blockquote>
                        ),
                      }}
                    >
                      {currentDoc.content}
                    </ReactMarkdown>
                  </article>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
                  <FileText className="h-16 w-16 mx-auto text-primary relative z-10" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Select a Document</h2>
                <p className="text-muted-foreground">Choose a document from the sidebar to view its content</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}