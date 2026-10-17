'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface Anomaly {
  name: string;
  solution: string;
}

interface ManufacturingCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  fullDescription: string;
  commonMaterials: Array<{ name: string; reason: string }>;
  applications: Array<{ name: string; description: string }>;
  advantages: string[];
  limitations: string[];
  processFlow: string[];
  anomalies: Anomaly[];
}

// 加工方式数据
const manufacturingCategories = [
  {
    id: 'machining',
    name: '机加',
    icon: '⚙️',
    description: '通过切削工具去除材料，获得精确形状和尺寸',
    fullDescription: '机加工是使用车床、铣床、钻床、磨床等机床，通过切削工具从工件上去除多余材料，获得所需形状、尺寸和表面质量的加工方法。适用于各种金属和部分非金属材料的高精度加工。',
    commonMaterials: [
      { name: '铝合金', reason: '易切削，刀具磨损小' },
      { name: '钛合金', reason: '强度高，耐高温，航空首选' },
      { name: '不锈钢', reason: '耐腐蚀，应用广泛' },
      { name: '碳钢', reason: '成本低，加工性好' },
      { name: '铜合金', reason: '导电性好，自润滑' },
      { name: '镁合金', reason: '最轻金属结构材料' },
    ],
    applications: [
      { name: '精密零件', description: '轴承、齿轮、凸轮等高精度零件' },
      { name: '发动机部件', description: '缸体、曲轴、活塞等核心部件' },
      { name: '医疗器械', description: '手术器械、植入物等精密件' },
      { name: '模具', description: '注塑模、压铸模、冲压模' },
      { name: '紧固件', description: '螺栓、螺母、销钉等标准件' },
      { name: '电子零件', description: '散热器、连接器、外壳' },
    ],
    advantages: ['加工精度高（可达IT5-IT6级）', '表面质量好（Ra0.8-0.2μm）', '适用材料范围广', '可加工复杂形状', '小批量生产灵活'],
    limitations: ['材料利用率低（30-50%）', '加工时间长', '刀具成本较高', '需要熟练技工'],
    processFlow: ['图纸设计', '工艺规划', '装夹定位', '粗加工', '精加工', '质量检测', '表面处理'],
    anomalies: [
      { name: '刀具磨损过快', solution: '降低切削速度、增加进给量、使用冷却液、选择更耐磨的刀具材料' },
      { name: '工件表面粗糙', solution: '提高切削速度、减小进给量、使用锋利刀具、增加冷却润滑' },
      { name: '工件变形', solution: '使用专用夹具、分多次加工去除应力、调整切削参数' },
      { name: '振动震颤', solution: '提高系统刚性、减小切削深度、改变切削速度、使用减震刀具' },
      { name: '尺寸超差', solution: '检查刀具磨损、补偿刀具偏置、控制热变形、定期测量' },
      { name: '断刀', solution: '减小切削深度、降低进给速度、选择合适刀具、检查夹紧可靠性' },
    ],
  },
  {
    id: 'injection',
    name: '注塑',
    icon: '💉',
    description: '熔融塑料注入模具冷却成型，大批量生产塑料制品',
    fullDescription: '注塑成型是将塑料颗粒熔融后注入模具型腔，冷却固化后开模取出制品的成型方法。是生产塑料制件最主要的成型方式，特别适合大批量生产。',
    commonMaterials: [
      { name: 'ABS', reason: '综合性能好，易加工' },
      { name: 'PP', reason: '密度小，耐化学性好' },
      { name: 'PC', reason: '透明性好，强度高' },
      { name: 'PA (尼龙)', reason: '耐磨性好，强度高' },
      { name: 'POM', reason: '自润滑，摩擦系数低' },
      { name: 'PBT', reason: '电性能好，耐热' },
    ],
    applications: [
      { name: '电子电器', description: '外壳、连接器、开关、继电器' },
      { name: '汽车零件', description: '仪表板、门板、保险杠' },
      { name: '日用品', description: '容器、玩具、文具' },
      { name: '医疗用品', description: '注射器、培养皿、试管' },
      { name: '工业零件', description: '齿轮、轴承、滑轮' },
      { name: '包装容器', description: '瓶盖、盒体、托盘' },
    ],
    advantages: ['生产效率高（周期10-60秒）', '制品尺寸精确', '可成型复杂形状', '一模多穴降低成本', '后加工量少'],
    limitations: ['模具成本高（数十万元）', '仅限热塑性塑料', '设计变更困难', '需要专业注塑设备'],
    processFlow: ['产品设计', '模具设计制造', '试模', '参数优化', '正式生产', '后处理（去浇口）', '检验包装'],
    anomalies: [
      { name: '短射（充填不足）', solution: '提高熔体温度、增加注射压力、加快注射速度、增加浇口尺寸、改善排气' },
      { name: '缩痕凹陷', solution: '增加保压时间和压力、提高模具温度、增加冷却时间、优化浇口位置' },
      { name: '气泡/空洞', solution: '降低熔体温度（避免降解）、增加背压、改善排气、调整干燥工艺' },
      { name: '飞边溢料', solution: '降低注射压力、减少锁模力不足、检查模具磨损、调整工艺参数' },
      { name: '熔接痕明显', solution: '提高模具温度、增加注射速度、改变浇口位置、优化排气' },
      { name: '制品翘曲变形', solution: '优化冷却系统、调整保压参数、平衡模具温度、设计加强筋' },
      { name: '银纹/水花', solution: '充分干燥原料、降低料筒温度、减少背压、增加模具温度' },
    ],
  },
  {
    id: 'compression',
    name: '模压',
    icon: '🔧',
    description: '材料放入模具加热加压成型，适用于热固性塑料、橡胶、复合材料',
    fullDescription: '模压成型是将材料放入加热的模具型腔中，施加压力使材料流动充满型腔并固化成型的方法。主要用于热固性塑料、橡胶、复合材料等的成型。',
    commonMaterials: [
      { name: '酚醛树脂', reason: '耐热性好，电性能优异' },
      { name: '环氧树脂', reason: '粘接力强，收缩率低' },
      { name: '硅胶', reason: '耐高温，弹性好' },
      { name: '氟橡胶', reason: '耐化学性，耐高温' },
      { name: '复合材料', reason: '轻质高强，可设计' },
      { name: '胶木', reason: '绝缘性好，成本低' },
    ],
    applications: [
      { name: '电气绝缘', description: '开关、插座、线圈骨架' },
      { name: '密封件', description: 'O型圈、油封、垫片' },
      { name: '刹车材料', description: '刹车片、离合器片' },
      { name: '复合材料', description: '电路板、板材、管材' },
      { name: '手柄', description: '工具手柄、把手' },
      { name: '齿轮', description: '小型齿轮、蜗轮' },
    ],
    advantages: ['制品质量高', '模具结构简单', '适合复杂嵌件', '材料浪费少', '设备投资较小'],
    limitations: ['生产周期较长', '仅限热固性材料', '自动化程度低', '工人劳动强度大'],
    processFlow: ['材料预成型', '预热', '放入模具', '加压加热', '固化成型', '脱模取出', '后处理（去飞边）'],
    anomalies: [
      { name: '固化不完全', solution: '延长固化时间、提高成型温度、检查材料配方、确保压力充分' },
      { name: '制品表面气泡', solution: '增加预热时间、改善排气、放慢加压速度、增加保压时间' },
      { name: '制品尺寸不稳定', solution: '控制投料量精度、稳定温度压力、规范操作流程' },
      { name: '飞边过多', solution: '调整加料量、修整模具、控制压力参数、检查模具磨损' },
      { name: '制品开裂', solution: '调整固化工艺、控制冷却速度、优化材料配方' },
    ],
  },
  {
    id: 'extrusion',
    name: '挤出',
    icon: '🔩',
    description: '材料通过挤压模具获得恒定截面形状，生产连续型材',
    fullDescription: '挤出成型是将材料（塑料、橡胶、金属等）通过挤压机的螺杆加热塑化，在压力作用下通过特定截面形状的模具，获得恒定截面连续型材的成型方法。',
    commonMaterials: [
      { name: 'PVC', reason: '成本低，性能多样' },
      { name: 'PE', reason: '耐化学性好，柔韧' },
      { name: 'PP', reason: '耐热性好，可弯折' },
      { name: 'ABS', reason: '强度高，表面好' },
      { name: '铝合金', reason: '轻质高强，耐腐蚀' },
      { name: '铜', reason: '导热导电，耐腐蚀' },
    ],
    applications: [
      { name: '管材', description: '水管、气管、油管、电线管' },
      { name: '型材', description: '门窗型材、装饰型材' },
      { name: '板材片材', description: '塑料板、装饰板、铝塑板' },
      { name: '薄膜', description: '农膜、包装膜、保鲜膜' },
      { name: '电线电缆', description: '绝缘护套、屏蔽层' },
      { name: '异型材', description: '密封条、卡扣、滑轨' },
    ],
    advantages: ['连续生产效率极高', '产品截面均匀一致', '长度不受限', '设备投资中等', '生产成本低'],
    limitations: ['仅限恒定截面产品', '产品形状受限', '模具更换复杂', '需要严格控制工艺'],
    processFlow: ['原料干燥', '加料塑化', '挤出成型', '冷却定型', '牵引切割', '收集包装'],
    anomalies: [
      { name: '挤出尺寸波动', solution: '稳定螺杆转速、控制喂料量、检查温控系统、稳定牵引速度' },
      { name: '制品表面粗糙', solution: '提高模具温度、降低牵引速度、抛光模具、优化配方' },
      { name: '挤出不稳定（喘流）', solution: '提高机筒温度、降低螺杆转速、检查原料水分、调整背压' },
      { name: '制品弯曲变形', solution: '均匀冷却定型、校正冷却水套、稳定牵引速度、调整冷却工艺' },
      { name: '焦料分解', solution: '降低料筒温度、清理螺杆料筒、减少停留时间、检查温控探头' },
      { name: '截面尺寸不均', solution: '修整模具口模、均匀加热定型套、稳定牵引张力' },
    ],
  },
  {
    id: 'mim',
    name: 'MIM',
    icon: '🏭',
    description: '金属注射成型 - 金属粉末与粘结剂混合注射成型后烧结',
    fullDescription: '金属注射成型（MIM）是将金属粉末与粘结剂混合制成喂料，通过注塑成型获得生坯，脱脂后烧结致密化，最终得到高精度、高性能金属零件的工艺。',
    commonMaterials: [
      { name: '不锈钢', reason: '耐腐蚀，应用最广' },
      { name: '钛合金', reason: '轻质高强，生物相容' },
      { name: '铁基合金', reason: '成本低，性能好' },
      { name: '钨合金', reason: '高密度，辐射屏蔽' },
      { name: '铜合金', reason: '导电导热，散热好' },
    ],
    applications: [
      { name: '医疗器械', description: '手术工具、植入物、牙科托架' },
      { name: '电子产品', description: '连接器、散热片、屏蔽罩' },
      { name: '汽车零件', description: '涡轮增压器、传感器件' },
      { name: '枪械', description: '扳机、击锤、瞄准器' },
      { name: '手表', description: '表壳、表带、指针' },
      { name: '工具', description: '钻头、扳手、批头' },
    ],
    advantages: ['可成型复杂形状', '尺寸精度高', '表面质量好', '材料利用率高', '大批量成本低'],
    limitations: ['产品尺寸受限（<100g）', '设备投资大', '工艺复杂', '对粉末要求高'],
    processFlow: ['喂料制备', '注射成型', '脱脂', '烧结', '后处理', '质量检测'],
    anomalies: [
      { name: '生坯开裂', solution: '优化注射参数、提高模温、减少内应力、改善喂料流动性' },
      { name: '脱脂开裂/变形', solution: '降低脱脂速率、优化脱脂温度曲线、改善粘结剂配方' },
      { name: '烧结变形', solution: '优化烧结曲线、使用支撑板、改善烧结炉温度均匀性' },
      { name: '尺寸超差', solution: '控制收缩率、修正模具尺寸、稳定烧结工艺' },
      { name: '密度不均', solution: '优化喂料混合均匀性、调整注射参数、改善脱脂工艺' },
      { name: '碳含量超标', solution: '控制烧结气氛、调整脱脂工艺、优化粘结剂配方' },
    ],
  },
  {
    id: '3dprinting',
    name: '3D打印',
    icon: '🖨️',
    description: '增材制造 - 逐层堆积材料制造三维实体，无需模具',
    fullDescription: '3D打印（增材制造）是基于离散-堆积原理，由CAD数字模型直接驱动，将材料逐层堆积制造实体零件的新技术。无需模具，可快速制造复杂形状零件。',
    commonMaterials: [
      { name: 'PLA', reason: '易打印，环保' },
      { name: 'ABS', reason: '强度高，耐热' },
      { name: '光敏树脂', reason: '精度高，表面好' },
      { name: '钛合金', reason: '生物相容，强度高' },
      { name: '铝合金', reason: '轻质高强，导热好' },
      { name: '不锈钢', reason: '强度高，耐腐蚀' },
    ],
    applications: [
      { name: '原型制作', description: '外观验证、功能测试、装配验证' },
      { name: '定制医疗', description: '义齿、助听器、手术导板' },
      { name: '航空航天', description: '轻量化部件、复杂结构件' },
      { name: '模具制造', description: '随形冷却水道、复杂型腔' },
      { name: '个性化产品', description: '首饰、文创、定制礼品' },
      { name: '备品备件', description: '停产零件、急需件' },
    ],
    advantages: ['无需模具', '设计自由度高', '个性化定制', '快速响应', '材料利用率高'],
    limitations: ['生产效率低', '单件成本高', '力学性能受限', '精度有限', '设备昂贵'],
    processFlow: ['CAD建模', '切片处理', '路径规划', '逐层打印', '后处理', '性能测试'],
    anomalies: [
      { name: '层间剥离开裂', solution: '提高打印温度、降低层高、优化打印速度、选择合适材料' },
      { name: '表面台阶纹明显', solution: '减小层高、优化打印方向、抛光后处理' },
      { name: '翘曲变形', solution: '提高热床温度、优化首层粘附、使用封闭仓、减小填充率' },
      { name: '堵头', solution: '检查耗材质量、降低回抽量、清理喷嘴、适当提高温度' },
      { name: '拉丝/拖尾', solution: '优化回抽参数、降低打印温度、调整移动速度' },
      { name: '尺寸精度差', solution: '校准机械结构、补偿收缩、调整填充和外壳参数' },
      { name: '孔隙率过高', solution: '调整填充率、优化打印参数、适当提高温度' },
    ],
  },
  {
    id: 'casting',
    name: '铸造',
    icon: '🔥',
    description: '熔融金属倒入铸型冷却凝固获得零件，适合复杂形状',
    fullDescription: '铸造是将熔融金属浇入铸型，冷却凝固后获得金属零件的成型方法。是制造具有复杂形状和内腔的金属零件最经济的工艺方法。',
    commonMaterials: [
      { name: '铸铁', reason: '成本低，减震性好' },
      { name: '铸钢', reason: '强度高，可靠性强' },
      { name: '铸造铝合金', reason: '轻质高强，耐腐蚀' },
      { name: '铸造镁合金', reason: '最轻金属，阻尼好' },
      { name: '青铜', reason: '耐磨性好，自润滑' },
      { name: '铸造钛合金', reason: '比强度高，耐腐蚀' },
    ],
    applications: [
      { name: '发动机', description: '缸体、缸盖、活塞、曲轴' },
      { name: '泵阀', description: '泵体、阀体、叶轮' },
      { name: '机床', description: '床身、立柱、工作台' },
      { name: '船舶', description: '螺旋桨、舵叶、尾轴' },
      { name: '五金', description: '水龙头、门锁、铰链' },
      { name: '艺术品', description: '雕塑、纪念币、工艺品' },
    ],
    advantages: ['适应性强', '可制造复杂形状', '可制造带内腔零件', '成本较低', '尺寸不受限'],
    limitations: ['组织疏松，力学性能较低', '尺寸精度不高（IT12-IT15）', '表面粗糙', '环境污染大'],
    processFlow: ['模样制作', '造型制芯', '熔炼浇注', '冷却凝固', '落砂清理', '热处理', '机加工'],
    anomalies: [
      { name: '气孔/针孔', solution: '改善排气、提高浇注温度、降低型砂水分、优化浇注系统' },
      { name: '缩孔/缩松', solution: '设置冒口补缩、优化浇注系统、控制凝固顺序、使用冷铁' },
      { name: '砂眼夹渣', solution: '提高型砂强度、优化浇注系统、挡渣过滤、控制浇注速度' },
      { name: '裂纹', solution: '控制冷却速度、改善退让性、优化铸件结构、合理设置浇冒口' },
      { name: '铸件偏芯', solution: '检查模样定位、加固砂芯、优化合箱操作' },
      { name: '化学成分不均', solution: '充分搅拌熔体、控制熔炼工艺、均匀添加合金' },
      { name: '表面粗糙', solution: '改善型砂质量、使用涂料、清理打磨表面' },
    ],
  },
  {
    id: 'forging',
    name: '锻压',
    icon: '🔨',
    description: '金属加热后施加压力变形，改善组织性能',
    fullDescription: '锻造是利用金属的塑性，借助锻锤或压力机的外力，使金属产生塑性变形，获得所需形状和尺寸，并改善金属组织性能的加工方法。',
    commonMaterials: [
      { name: '碳钢', reason: '成本最低，锻造性好' },
      { name: '合金钢', reason: '综合性能好，应用广' },
      { name: '锻造铝合金', reason: '轻质高强，航空首选' },
      { name: '锻造钛合金', reason: '高温性能好，航空应用' },
      { name: '高温合金', reason: '耐高温，燃气轮机' },
      { name: '铜合金', reason: '导电导热，耐腐蚀' },
    ],
    applications: [
      { name: '汽车锻件', description: '连杆、曲轴、齿轮、转向节' },
      { name: '航空锻件', description: '起落架、叶片、盘件、梁' },
      { name: '紧固件', description: '螺栓、螺母、铆钉' },
      { name: '五金工具', description: '扳手、钳子、锤子' },
      { name: '石油化工', description: '法兰、管件、阀门' },
      { name: '工程机械', description: '销轴、接头、支座' },
    ],
    advantages: ['力学性能优异', '组织致密', '纤维流线', '可靠性高', '材料利用率高'],
    limitations: ['形状受限', '模具成本高', '尺寸受限', '设备投资大', '能耗较高'],
    processFlow: ['下料', '加热', '锻造成型', '切边', '热处理', '表面处理', '检验'],
    anomalies: [
      { name: '充填不满', solution: '提高坯料温度、增加打击力/压力、改进润滑、增加坯料体积' },
      { name: '折叠', solution: '优化模具设计、调整变形工艺、控制金属流动、改善润滑' },
      { name: '过烧/过热', solution: '严格控制加热温度、缩短保温时间、使用温度监控' },
      { name: '裂纹', solution: '控制始锻终锻温度、改善变形工艺、预热模具、控制冷却速度' },
      { name: '欠压（厚度超差）', solution: '增加打击能量、调整坯料体积、检查模具磨损' },
      { name: '模具磨损快', solution: '优化模具材料、改善润滑、控制锻造温度、预热模具' },
      { name: '错移', solution: '检查导向装置、调整模具位置、检查设备精度' },
    ],
  },
];

function ManufacturingGuideContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<ManufacturingCategory | null>(null);

  useEffect(() => {
    const categoryId = searchParams.get('category');
    if (categoryId) {
      const found = manufacturingCategories.find((c) => c.id === categoryId);
      if (found) {
        setSelectedCategory(found);
      }
    } else {
      setSelectedCategory(null);
    }
  }, [searchParams]);

  const handleBack = () => {
    router.push('/manufacturing');
  };

  const handleCategoryClick = (category: ManufacturingCategory) => {
    router.push(`/manufacturing?category=${category.id}`);
  };

  if (selectedCategory) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button onClick={handleBack} variant="secondary">
            ← 返回
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <span className="text-4xl mr-3">{selectedCategory.icon}</span>
            {selectedCategory.name}
          </h1>
        </div>

        {/* 概述 */}
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold text-gray-900">工艺概述</h3>
          </CardHeader>
          <CardBody>
            <p className="text-gray-700">{selectedCategory.fullDescription}</p>
          </CardBody>
        </Card>

        {/* 常用材料 */}
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold text-gray-900">常用材料</h3>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedCategory.commonMaterials.map((material, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <h4 className="font-semibold text-gray-900">{material.name}</h4>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{material.reason}</p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* 应用产品 */}
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold text-gray-900">应用产品</h3>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedCategory.applications.map((app, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-900">{app.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{app.description}</p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* 优缺点 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold text-green-700">✓ 优点</h3>
            </CardHeader>
            <CardBody>
              <ul className="space-y-2">
                {selectedCategory.advantages.map((advantage, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">{advantage}</span>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold text-red-700">✗ 局限性</h3>
            </CardHeader>
            <CardBody>
              <ul className="space-y-2">
                {selectedCategory.limitations.map((limitation, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    <span className="text-gray-700">{limitation}</span>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </div>

        {/* 工艺流程 */}
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold text-gray-900">典型工艺流程</h3>
          </CardHeader>
          <CardBody>
            <div className="flex flex-wrap items-center gap-2">
              {selectedCategory.processFlow.map((step, index) => (
                <div key={index} className="flex items-center">
                  <Badge variant="primary" className="px-3 py-2">
                    {step}
                  </Badge>
                  {index < selectedCategory.processFlow.length - 1 && (
                    <span className="text-gray-400 mx-2">→</span>
                  )}
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* 加工异常与解决方案 */}
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold text-gray-900">常见加工异常与解决方案</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {selectedCategory.anomalies.map((anomaly, index) => (
                <div key={index} className="border-l-4 border-yellow-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">⚠️ {anomaly.name}</h4>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-gray-700">解决方案：</span>
                    {anomaly.solution}
                  </p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">材料加工指南</h1>
        <p className="text-gray-600">根据加工方式选择合适的材料和工艺路线</p>
      </div>

      {/* 加工方式分类 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {manufacturingCategories.map((category) => (
          <div
            key={category.id}
            onClick={() => handleCategoryClick(category)}
            className="cursor-pointer hover:shadow-lg transition-shadow"
          >
            <Card className="h-full">
              <CardBody className="text-center">
                <div className="text-5xl mb-3">{category.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{category.description}</p>
                <div className="flex justify-between text-xs text-gray-500 border-t pt-3">
                  <span>{category.commonMaterials.length} 种常用材料</span>
                  <span>{category.applications.length} 类应用</span>
                </div>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>

      {/* 说明 */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">使用说明</h3>
        </CardHeader>
        <CardBody>
          <div className="text-sm text-gray-600 space-y-2">
            <p>1. 点击上方加工方式卡片，查看该工艺的详细信息</p>
            <p>2. 了解每种加工方式适用的常用材料和应用产品</p>
            <p>3. 参考工艺优缺点，选择最适合的加工方法</p>
            <p>4. 查看典型工艺流程，了解生产步骤</p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default function ManufacturingGuidePage() {
  return (
    <Suspense fallback={<div className="text-center py-12"><div className="text-gray-500">加载中...</div></div>}>
      <ManufacturingGuideContent />
    </Suspense>
  );
}
