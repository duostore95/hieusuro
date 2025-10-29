import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { defaultSchema } from 'rehype-sanitize';
import { 
  Bold, 
  Italic, 
  Link, 
  Image, 
  Video, 
  List, 
  Code, 
  Heading,
  Eye,
  Edit3,
  HelpCircle
} from 'lucide-react';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  testId?: string;
}

export function MarkdownEditor({ value, onChange, placeholder, label, testId }: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview' | 'help'>('edit');

  // Custom sanitize schema to allow safe YouTube embeds
  const customSanitizeSchema = {
    ...defaultSchema,
    tagNames: [...(defaultSchema.tagNames || []), 'iframe'],
    attributes: {
      ...defaultSchema.attributes,
      iframe: [
        'src', 
        'width', 
        'height', 
        'frameBorder', 
        'allowFullScreen',
        'title',
        'referrerPolicy'
      ]
    },
    protocols: {
      ...defaultSchema.protocols,
      src: ['https']
    }
  };

  const insertMarkdown = (before: string, after: string = '', placeholder: string = '') => {
    const textarea = document.querySelector(`[data-testid="${testId}"]`) as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const replacement = selectedText || placeholder;
    
    const newValue = value.substring(0, start) + before + replacement + after + value.substring(end);
    onChange(newValue);
    
    // Focus and set cursor position
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + before.length + replacement.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const toolbarButtons = [
    {
      icon: Bold,
      label: 'In đậm',
      action: () => insertMarkdown('**', '**', 'text in đậm'),
    },
    {
      icon: Italic,
      label: 'In nghiêng',
      action: () => insertMarkdown('*', '*', 'text in nghiêng'),
    },
    {
      icon: Heading,
      label: 'Tiêu đề',
      action: () => insertMarkdown('## ', '', 'Tiêu đề'),
    },
    {
      icon: Link,
      label: 'Chèn link',
      action: () => insertMarkdown('[', '](https://example.com)', 'text link'),
    },
    {
      icon: Image,
      label: 'Chèn ảnh',
      action: () => insertMarkdown('![', '](https://example.com/image.jpg)', 'mô tả ảnh'),
    },
    {
      icon: Video,
      label: 'Video YouTube',
      action: () => insertMarkdown('\n<iframe width="560" height="315" src="https://www.youtube.com/embed/', '" frameborder="0" allowfullscreen></iframe>\n', 'VIDEO_ID'),
    },
    {
      icon: List,
      label: 'Danh sách',
      action: () => insertMarkdown('\n- ', '', 'Item 1\n- Item 2\n- Item 3'),
    },
    {
      icon: Code,
      label: 'Code',
      action: () => insertMarkdown('`', '`', 'code'),
    },
  ];

  const helpContent = `
## Hướng dẫn Markdown

### Định dạng văn bản
- **In đậm**: \`**text**\` hoặc \`__text__\`
- *In nghiêng*: \`*text*\` hoặc \`_text_\`
- \`Code\`: \`\`\`code\`\`\`

### Tiêu đề
\`\`\`
# Tiêu đề lớn (H1)
## Tiêu đề trung (H2)  
### Tiêu đề nhỏ (H3)
\`\`\`

### Links và ảnh
- Link: \`[Text hiển thị](https://example.com)\`
- Ảnh: \`![Mô tả ảnh](https://example.com/image.jpg)\`

### Video YouTube
\`\`\`html
<iframe width="560" height="315" 
  src="https://www.youtube.com/embed/VIDEO_ID" 
  frameborder="0" allowfullscreen>
</iframe>
\`\`\`

### Danh sách
\`\`\`
- Item 1
- Item 2
- Item 3

1. Số thứ tự 1
2. Số thứ tự 2
3. Số thứ tự 3
\`\`\`

### Code blocks
\`\`\`
\`\`\`javascript
function hello() {
  console.log("Hello World!");
}
\`\`\`
\`\`\`
  `;

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Trình soạn thảo nâng cao</CardTitle>
        </CardHeader>
        
        <CardContent className="pt-0">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="edit" className="text-xs">
                <Edit3 className="w-3 h-3 mr-1" />
                Viết
              </TabsTrigger>
              <TabsTrigger value="preview" className="text-xs">
                <Eye className="w-3 h-3 mr-1" />
                Xem trước
              </TabsTrigger>
              <TabsTrigger value="help" className="text-xs">
                <HelpCircle className="w-3 h-3 mr-1" />
                Hướng dẫn
              </TabsTrigger>
            </TabsList>

            <TabsContent value="edit" className="mt-0">
              <div className="space-y-3">
                {/* Toolbar */}
                <div className="flex flex-wrap gap-1 p-2 border border-border rounded-md bg-muted/30">
                  {toolbarButtons.map((button, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      onClick={button.action}
                      className="h-8 px-2"
                      type="button"
                      title={button.label}
                    >
                      <button.icon className="w-4 h-4" />
                    </Button>
                  ))}
                </div>
                
                {/* Editor */}
                <Textarea
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder={placeholder || "Nhập nội dung bài viết bằng Markdown..."}
                  className="min-h-[400px] font-mono text-sm resize-none"
                  data-testid={testId}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="preview" className="mt-0">
              <div className="min-h-[400px] p-4 border border-border rounded-md bg-background overflow-auto">
                {value.trim() ? (
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw, [rehypeSanitize, customSanitizeSchema]]}
                      components={{
                        img: ({src, alt, ...props}) => (
                          <img 
                            src={src} 
                            alt={alt} 
                            className="max-w-full h-auto rounded-lg shadow-sm"
                            loading="lazy"
                            {...props}
                          />
                        ),
                        iframe: ({src, ...props}) => (
                          <div className="relative aspect-video">
                            <iframe 
                              src={src}
                              className="absolute inset-0 w-full h-full rounded-lg"
                              allowFullScreen
                              {...props}
                            />
                          </div>
                        ),
                        a: ({href, children, ...props}) => (
                          <a 
                            href={href} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                            {...props}
                          >
                            {children}
                          </a>
                        ),
                      }}
                    >
                      {value}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-muted-foreground italic">
                    Không có nội dung để xem trước. Hãy viết nội dung ở tab "Viết".
                  </p>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="help" className="mt-0">
              <div className="min-h-[400px] p-4 border border-border rounded-md bg-background overflow-auto">
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                  >
                    {helpContent}
                  </ReactMarkdown>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}